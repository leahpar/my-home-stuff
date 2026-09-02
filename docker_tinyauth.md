# Tinyauth

https://tinyauth.app/

Middleware d'authentification (forward auth) pour [NPM](docker_nginx_proxy_manager.md).
Remplace [Authelia](docker_authelia.md), et délègue le SSO à [PocketID](docker_pocketid.md).

Toute la configuration est dans un seul fichier YAML, `/home/pi/tinyauth/config.yaml`.

## Installation

Compte local de secours (hash bcrypt) :

```bash
docker run -it --rm ghcr.io/tinyauthapp/tinyauth:v5 user create --interactive
```

> Ne **pas** activer l'option « Format for Docker » : le doublement des `$` ne concerne que les
> variables d'environnement, pas le fichier YAML.

```bash
docker run -d \
    --name tinyauth \
    --restart=unless-stopped \
    -p 3000:3000 \
    -e TZ=Europe/Paris \
    -e TINYAUTH_CONFIGFILE=/data/config.yaml \
    -v /home/pi/tinyauth:/data \
    ghcr.io/tinyauthapp/tinyauth:v5
```

## Configuration

`/home/pi/tinyauth/config.yaml` (monté sur `/data/config.yaml`)

```yaml
appUrl: https://auth.appart.42p.ovh

auth:
  trustedProxies:
    - 172.17.0.0/16 # Réseau depuis lequel NPM appelle Tinyauth
  secureCookie: true
  sessionExpiry: 604800 # 7 jours
  
  acls:
    # Autorise seulement les utilisateurs explicitement déclarés dans `apps:`.
    policy: deny

ui:
  title: Appart

oauth:
  # Redirection directe vers PocketID
  autoRedirect: pocketid
  providers:
    pocketid:
      name: Pocket ID
      clientId: <client id>
      clientSecret: <client secret>
      authUrl: https://pocketid.appart.42p.ovh/authorize
      tokenUrl: https://pocketid.appart.42p.ovh/api/oidc/token
      userinfoUrl: https://pocketid.appart.42p.ovh/api/oidc/userinfo
      redirectUrl: https://auth.appart.42p.ovh/api/oauth/callback/pocketid
      scopes:
        - openid
        - email
        - profile
        - groups

apps:
  jellyseerr:
    config:
      domain: jellyseerr.appart.42p.ovh
    oauth:
      groups: jellyseerr
    path:
      allow: ^\/api
  mealie:
    config:
      domain: mealie.appart.42p.ovh
    oauth:
      groups: mealie
```

Pour vérifier ce que Tinyauth a réellement chargé :

```bash
docker exec tinyauth tinyauth config
```

## Host NPM

| Champ   | Valeur                                 |
|---------|----------------------------------------|
| Domain  | `auth.appart.42p.ovh`                  |
| Forward | `grievous.local` : `3000`              |
| SSL     | certificat Let's Encrypt + *Force SSL* |

⚠️ Ce host ne doit évidemment **pas** être protégé par Tinyauth lui-même.

## Configuration auth dans Nginx

> [NPM](docker_nginx_proxy_manager.md), onglet *Advanced* de chaque host à protéger

```nginx
location / {
    proxy_pass http://jellyseerr.local:5055;

    auth_request /tinyauth;
    auth_request_set $redirection_url $upstream_http_x_tinyauth_location;
    error_page 401 403 =302 $redirection_url;
}

location /tinyauth {
    internal;
    proxy_pass http://grievous.local:3000/api/auth/nginx;

    proxy_pass_request_body off;
    proxy_set_header Content-Length "";

    proxy_set_header x-forwarded-for   $remote_addr;
    proxy_set_header x-real-ip         $remote_addr;
    proxy_set_header x-forwarded-proto $scheme;
    proxy_set_header x-forwarded-host  $http_host;
    proxy_set_header x-forwarded-uri   $request_uri;
}
```

- ⚠️ **Désactiver « Block Common Exploits »** sur les hosts protégés : NPM y bloque des
  paramètres de query utilisés par Tinyauth.
- Dès qu'il y a un `location /` dans l'onglet *Advanced*, le *Forward Hostname/Port* de l'onglet
  *Details* n'est plus utilisé : c'est le `proxy_pass` qui décide.
- Websockets, à ajouter dans `location /` si le service en a besoin :

```nginx
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
```

- Bloc à répéter sur chaque host à protéger.

## Ordre de migration depuis Authelia

1. [PocketID](docker_pocketid.md) déployé, host NPM créé, compte admin créé
2. Client OIDC `Tinyauth` créé dans PocketID
3. Tinyauth déployé, host NPM `auth.appart.42p.ovh` basculé vers le port 3000
4. Un seul host de test basculé sur le nouveau bloc nginx, validation du login
5. Les autres hosts, un par un
6. `docker stop authelia` — garder `/home/pi/authelia/config` le temps de valider
