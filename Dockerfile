# Utilise l'image officielle de MongoDB
FROM mongo:6.0

# Définit le répertoire de travail
WORKDIR /data/db

# Expose le port par défaut de MongoDB
EXPOSE 27017
