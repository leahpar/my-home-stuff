# PocketID

https://pocket-id.org/

Serveur OIDC minimaliste, authentification par passkeys.
Utilisé comme fournisseur d'identité par [Tinyauth](docker_tinyauth.md).

## Installation

Clé de chiffrement, à générer une seule fois et à conserver :

```bash
openssl rand -base64 32
```

```bash
docker run -d \
    --name pocket-id \
    --restart=unless-stopped \
    -p 1411:1411 \
    -e TZ=Europe/Paris \
    -e PUID=1000 \
    -e PGID=1000 \
    -e APP_URL=https://pocketid.appart.42p.ovh \
    -e TRUST_PROXY=true \
    -e ENCRYPTION_KEY="<clé générée ci-dessus>" \
    -v /home/pi/pocket-id/data:/app/data \
    pocketid/pocket-id:v2
```

- `TRUST_PROXY=true` : indispensable derrière [NPM](docker_nginx_proxy_manager.md), sinon l'IP
  client vue par PocketID est celle du proxy.
- `ENCRYPTION_KEY` : à ne pas perdre, sinon les données chiffrées en base sont irrécupérables.
  Variante fichier : `ENCRYPTION_KEY_FILE=/app/data/encryption_key`.

## Configuration NPM

> **HTTPS obligatoire** : les passkeys (WebAuthn) exigent un contexte sécurisé.
> Créer le host NPM *avant* le premier accès.

| Champ              | Valeur                                 |
|--------------------|----------------------------------------|
| Domain             | `pocketid.appart.42p.ovh`              |
| Forward            | `grievous.local` : `1411`              |
| Websockets Support | activé                                 |
| SSL                | certificat Let's Encrypt + *Force SSL* |

⚠️ Ne **pas** protéger ce host par [Tinyauth](docker_tinyauth.md) : dépendance circulaire.

Ajouter aussi l'entrée DNS locale côté [PiHole](docker_pihole.md) pour l'accès interne.

## Premier démarrage

Création du compte admin : https://pocketid.appart.42p.ovh/setup
(page accessible une seule fois)

## Client OIDC pour Tinyauth

*Administration* → *OIDC Clients* → *Add OIDC Client*

| Champ        | Valeur                                                    |
|--------------|-----------------------------------------------------------|
| Name         | `Tinyauth`                                                |
| Callback URL | `https://auth.appart.42p.ovh/api/oauth/callback/pocketid` |

Noter le *Client ID* et le *Client Secret* (le secret n'est affiché qu'une seule fois),
à reporter dans la conf [Tinyauth](docker_tinyauth.md).
