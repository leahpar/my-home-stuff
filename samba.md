# Samba

## Installation

```bash
sudo apt install samba
```

## Configuration

```conf
#/etc/samba/smb.conf
[PiShare]
  path=/mnt/dd-2t
  browseable=yes
  writeable=yes
  read only=no
  guest ok=yes
  create mask=0664
  directory mask=0775
  force user=pi
  public=yes
```

**Activer l'accès publique (guest) sous Windows 10/11 :**

```powershell
Set-SmbClientConfiguration -EnableInsecureGuestLogons $true -Force
```
