# Dawarich

> TODO

```dockerfile
services:
  dawarich_db:
    #image: postgis/postgis:14-3.5-alpine
    image: ghcr.io/baosystems/postgis:13-3.5-alpine
    shm_size: 1G
    container_name: dawarich_db
    volumes:
      - /home/pi/dawarich/db:/var/lib/postgresql/data
      - /home/pi/dawarich/shared:/var/shared
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    restart: unless-stopped

  dawarich_app:
    image: freikin/dawarich:latest
    container_name: dawarich_app
    volumes:
      - /home/pi/dawarich/dawarich/public:/var/app/public
      - /home/pi/dawarich/dawarich/watched:/var/app/tmp/imports/watched
      - /home/pi/dawarich/dawarich/storage:/var/app/storage
    ports:
      - 3033:3000
    stdin_open: true
    tty: true
    entrypoint: web-entrypoint.sh
    command: ['bin/rails', 'server', '-p', '3000', '-b', '::']
    restart: unless-stopped
    environment:
      RAILS_ENV: development
      REDIS_URL: redis://redis:6379/0
      DATABASE_HOST: dawarich_db
      DATABASE_USERNAME: postgres
      DATABASE_PASSWORD: password
      DATABASE_NAME: dawarich
      MIN_MINUTES_SPENT_IN_CITY: 60
      APPLICATION_HOSTS: localhost
      TIME_ZONE: Europe/Paris
      APPLICATION_PROTOCOL: http
      DISTANCE_UNIT: km
      PROMETHEUS_EXPORTER_ENABLED: false
      PROMETHEUS_EXPORTER_HOST: 0.0.0.0
      PROMETHEUS_EXPORTER_PORT: 9394
      ENABLE_TELEMETRY: false # More on telemetry: https://dawarich.app/docs/tutorials/telemetry
      SELF_HOSTED: "true"
    logging:
      driver: "json-file"
      options:
        max-size: "100m"
        max-file: "5"

  dawarich_sidekiq:
    image: freikin/dawarich:latest
    container_name: dawarich_sidekiq
    volumes:
      - /home/pi/dawarich/dawarich/public:/var/app/public
      - /home/pi/dawarich/dawarich/watched:/var/app/tmp/imports/watched
      - /home/pi/dawarich/dawarich/storage:/var/app/storage
    stdin_open: true
    tty: true
    entrypoint: sidekiq-entrypoint.sh
    command: ['sidekiq']
    restart: unless-stopped
    environment:
      RAILS_ENV: development
      REDIS_URL: redis://dawarich_redis:6379/0
      DATABASE_HOST: dawarich_db
      DATABASE_USERNAME: postgres
      DATABASE_PASSWORD: password
      DATABASE_NAME: dawarich_development
      APPLICATION_HOSTS: localhost
      BACKGROUND_PROCESSING_CONCURRENCY: 10
      APPLICATION_PROTOCOL: http
      DISTANCE_UNIT: km
      PROMETHEUS_EXPORTER_ENABLED: false
      PROMETHEUS_EXPORTER_HOST: dawarich_app
      PROMETHEUS_EXPORTER_PORT: 9394
      ENABLE_TELEMETRY: false # More on telemetry: https://dawarich.app/docs/tutorials/telemetry
      SELF_HOSTED: "true"
    logging:
      driver: "json-file"
      options:
        max-size: "100m"
        max-file: "5"
    deploy:
      resources:
        limits:
          memory: '1G'


```
