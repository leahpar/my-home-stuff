# Installation Docker sur Raspberry Pi

## Docker

For the 64-bit version of Raspbian follow the instructions for Debian :
https://docs.docker.com/engine/install/debian/

## Divers docker

Changer le démarrage automatique d'un conteneur :

```bash
docker update --restart=unless-stopped <container>
```

Lister les conteneurs avec leur IP :

```bash
docker ps -q | xargs docker inspect --format '{{ .Name }} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
``` 
