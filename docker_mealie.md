# Mealie

> Dépend de [PostgreSQL](docker_postgresql.md)

## Installation

```bash
docker run -d \
  --name=mealie \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Europe/Paris \
  -e ALLOW_SIGNUP=false \
  -e DB_ENGINE=postgres \
  -e POSTGRES_SERVER=host.docker.internal \
  -e POSTGRES_PORT=5432 \
  -e POSTGRES_USER=mealie \
  -e POSTGRES_PASSWORD=mealie \
  -e POSTGRES_DB=mealie \
  -p 9925:9000 \
  -v /home/pi/mealie:/app/data \
  --restart unless-stopped \
  ghcr.io/mealie-recipes/mealie:v2.8.0
```

## Configuration postgresql

```sql
create user mealie;
create database mealie owner mealie;
grant all privileges on database mealie to mealie;
alter user mealie password 'mealie';
```
