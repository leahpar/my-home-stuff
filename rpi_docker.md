# Installation Docker sur Raspberry Pi

## Docker

For the 64-bit version of Raspbian follow the instructions for Debian :
https://docs.docker.com/engine/install/debian/

## Config

`/etc/docker/daemon.json` :

```json
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "dns": ["10.0.0.10", "1.1.1.1", "8.8.8.8"],
  "cgroup-parent": "docker.slice",
  "log-level": "info",
  "log-opts": {
    "max-size": "100m",
    "max-file": "10"
  }
}
```

## Divers docker

Changer le démarrage automatique d'un conteneur :

```bash
docker update --restart=unless-stopped <container>
```

Lister les conteneurs avec leur IP :

```bash
docker ps -q | xargs docker inspect --format '{{ .Name }} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
``` 
