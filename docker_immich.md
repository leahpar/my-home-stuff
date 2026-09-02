# Immich

> Hébergé sur Tarkin. Dépend du [Redis mutualisé](docker_redis.md) (index 0).

## docker-compose.yml

```yaml
name: immich

networks:
  default:
  shared:
    external: true
    name: shared

services:
  immich-server:
    container_name: immich_server
    image: ghcr.io/immich-app/immich-server:${IMMICH_VERSION:-release}
    volumes:
      - ${UPLOAD_LOCATION}:/data
      - /etc/localtime:/etc/localtime:ro
    env_file:
      - .env
    ports:
      - '2283:2283'
    depends_on:
      - database
    networks:
      - default
      - shared
    restart: unless-stopped
    healthcheck:
      disable: false

  database:
    container_name: immich_postgres
    image: ghcr.io/immich-app/postgres:14-vectorchord0.4.3-pgvectors0.2.0@sha256:bcf63357191b76a916ae5eb93464d65c07511da41e3bf7a8416db519b40b1c23
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_DB: ${DB_DATABASE_NAME}
      POSTGRES_INITDB_ARGS: '--data-checksums'
    volumes:
      - ${DB_DATA_LOCATION}:/var/lib/postgresql/data
    shm_size: 128mb
    restart: unless-stopped
    healthcheck:
      disable: false
```

## .env

```bash
UPLOAD_LOCATION=./library
DB_DATA_LOCATION=./postgres
TZ=Europe/Paris
IMMICH_VERSION=v3
DB_PASSWORD=postgres
DB_USERNAME=postgres
DB_DATABASE_NAME=immich

# Redis mutualisé (cf docker_redis.md) - index dédié à Immich
REDIS_HOSTNAME=shared_redis
REDIS_DBINDEX=0
```

## Remarques

- Postgres dédié (image custom avec extension vectorielle `vectorchord`/`pgvector`), pas de mutualisation possible avec les autres services : Immich impose une version majeure (14) et une extension spécifique.
- Redis mutualisé avec Dawarich via `REDIS_HOSTNAME`/`REDIS_DBINDEX` (variables documentées sur https://docs.immich.app/install/environment-variables) plutôt que le service `redis` bundlé par défaut dans le compose officiel.
- Compatible arm64 nativement (contrairement à Dawarich, cf [docker_dawarich.md](docker_dawarich.md)).
- Pas de reverse proxy configuré pour le moment (accès direct `http://tarkin.local:2283`).
