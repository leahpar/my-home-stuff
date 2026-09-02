# Redis (mutualisé)

> Hébergé sur Tarkin. Une seule instance Valkey (fork Redis, compatible protocole) partagée entre plusieurs applications, chacune isolée sur son propre index de base logique (0-15).

Pertinent uniquement pour des apps qui utilisent Redis comme cache/queue de jobs (donnée non critique, récupérable). Ne pas faire ça pour Postgres : les services qui en ont besoin ici (Immich, Dawarich) imposent chacun une version majeure et une extension différentes, incompatibles entre elles dans une même instance — cf [docker_postgresql.md](docker_postgresql.md) pour le cas d'un Postgres générique mutualisable (Mealie).

## docker-compose.yml

```yaml
name: redis

networks:
  shared:
    name: shared

services:
  redis:
    image: valkey/valkey:9-alpine
    container_name: shared_redis
    command: >
      redis-server
      --save 900 1
      --save 300 10
      --appendonly no
    volumes:
      - ./data:/data
    restart: unless-stopped
    networks:
      - shared
```

Le réseau `shared` est créé par ce compose (sans `external: true` ici, contrairement aux apps qui le consomment) et permet aux autres stacks de résoudre le conteneur par son nom (`shared_redis`) en le déclarant `external: true` dans leur propre `docker-compose.yml`.

## Allocation des index de base

| Index | Application |
|-------|-------------|
| 0     | [Immich](docker_immich.md) (`REDIS_HOSTNAME=shared_redis`, `REDIS_DBINDEX=0`) |
| 1     | [Dawarich](docker_dawarich.md) (`REDIS_URL=redis://shared_redis:6379/1`) |

## Remarques

- Pas de port publié sur l'hôte : uniquement accessible depuis le réseau Docker `shared`.
- `docker exec shared_redis redis-cli info keyspace` pour vérifier la répartition des clés par index.
