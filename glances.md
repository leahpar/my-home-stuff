# Glances

Installation

```bash
sudo apt install pipx
pipx install 'glances[all]'
```

Lancer Glances (mode serveur)

```bash
glances -w
```

Démarrer Glances au boot avec systemd ([doc](https://github.com/nicolargo/glances/wiki/Start-Glances-through-Systemd))

```bash
# /etc/systemd/system/glances.service
[Unit]
Description=Glances
After=network.target

[Service]
ExecStart=/home/pi/.local/bin/glances -w
Restart=always
RemainAfterExit=no

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable glances
sudo systemctl start glances
```
