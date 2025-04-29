# PostgreSQL

> WIP

## Installation

```bash
docker run -d  \
  --name=postgres \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Europe/Paris \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin \
  -p 5432:5432 \
  -v /home/pi/postgres/data:/var/lib/postgresql/data \
  --restart unless-stopped \
  postgres:alpine
```

## Gestion des utilisateurs

```bash
docker exec -it postgres psql --user admin
```

```sql
-- Créer un utilisateur
create user XXX;
-- Créer une base de données
create database XXX owner XXX;
-- Donner les droits sur la base de données à l'utilisateur
grant all privileges on database XXX to XXX;
-- Changer le mot de passe de l'utilisateur
alter user XXX password 'XXX';
```


