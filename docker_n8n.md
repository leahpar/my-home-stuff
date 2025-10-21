# Redis

```bash
docker run -d \
  --name n8n \
  --restart=unless-stopped \
  -e PUID=1000 -e PGID=1000 \
  -e TZ=Europe/Paris \
  -e N8N_SECURE_COOKIE=false \
  -p 5678:5678 \
  -v /home/pi/n8n:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n
```

# Exporter les données

```bash
docker exec -it n8n n8n export:credentials --all --decrypted > n8ncredentials.json
docker exec -it n8n n8n export:workflow --all > n8nworkflow.json
```

# Importer les données

Copier les fichiers `n8ncredentials.json` et `n8nworkflow.json` dans le dossier `/home/pi/n8n` puis exécuter :

```bash
docker exec -it n8n n8n import:credentials --input=/home/node/.n8n/n8ncredentials.json
docker exec -it n8n n8n import:workflow --input=/home/node/.n8n/n8nworkflow.json
```

