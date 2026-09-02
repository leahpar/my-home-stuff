# Nginx Proxy Manager

> `sudo` pour les ports < 1023

```bash
sudo docker run -d \
    --name nginx-proxy-manager \
    --restart=unless-stopped \
    --user 1000:1000 \
    -p 80:80 \
    -p 81:81 \
    -p 443:443 \
    -e TZ=Europe/Paris \
    -v /home/pi/nginx-proxy-manager/data:/data \
    -v /home/pi/nginx-proxy-manager/letsencrypt:/etc/letsencrypt \
    jc21/nginx-proxy-manager:latest
```

> Voir [Tinyauth](docker_tinyauth.md) pour la gestion de l'authentification (SSO via [PocketID](docker_pocketid.md))

> ⚠️ Désactiver l'option *Block Common Exploits* sur les hosts protégés par Tinyauth :
> elle bloque des paramètres de query nécessaires à l'authentification.

Soucis de io permanent de `s6-supervise` :
> https://github.com/NginxProxyManager/nginx-proxy-manager/issues/2741
