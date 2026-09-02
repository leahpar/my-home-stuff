# Mealie

> Hébergé sur Tarkin. Dépend de [PostgreSQL](docker_postgresql.md) (instance dédiée sur Tarkin, `postgres:16-alpine` — voir remarque sur `postgres:alpine` ci-dessous).

## Installation

```bash
docker run -d \
  --name=mealie \
  -e PUID=1000 \
  -e PGID=985 \
  -e TZ=Europe/Paris \
  -e ALLOW_SIGNUP=false \
  -e DB_ENGINE=postgres \
  --add-host=host.docker.internal:host-gateway \
  -e POSTGRES_SERVER=host.docker.internal \
  -e POSTGRES_PORT=5432 \
  -e POSTGRES_USER=mealie \
  -e POSTGRES_PASSWORD=mealie \
  -e POSTGRES_DB=mealie \
  -e BASE_URL=http://tarkin.local:9925 \
  -p 9925:9000 \
  -v /home/pi/mealie:/app/data \
  --restart unless-stopped \
  ghcr.io/mealie-recipes/mealie:v2.8.0
```

> `PGID=985` correspond au groupe `docker` sur Tarkin (varie par hôte, `getent group docker` pour vérifier).

## Remarques

- Ajoute de `--add-host=host.docker.internal:host-gateway` pour pouvoir utiliser `host.docker.internal` sous linux.
- **`postgres:alpine` pointe désormais vers Postgres 18**, qui change le layout du volume de données (`/var/lib/postgresql` au lieu de `/var/lib/postgresql/data`) et ne démarre pas avec un volume monté à l'ancien chemin. Épingler `postgres:16-alpine` (ou toute version < 18) pour rester compatible avec la recette documentée dans [docker_postgresql.md](docker_postgresql.md).
- Pas de reverse proxy configuré pour le moment (accès direct `http://tarkin.local:9925`) — l'entrée NPM `mealie.appart.42p.ovh` existe mais reste désactivée, pointée vers l'ancien hôte (dooku).
- TODO: gestion de l'authentification avec [PocketID](docker_pocketid.md) ? Mealie gère l'OIDC nativement (client OIDC direct, pas besoin de passer par Tinyauth). Voir [doc mealie](https://docs.mealie.io/documentation/getting-started/authentication/oidc-v2/)

## Configuration postgresql

```sql
create user mealie;
create database mealie owner mealie;
grant all privileges on database mealie to mealie;
alter user mealie password 'mealie';
```
