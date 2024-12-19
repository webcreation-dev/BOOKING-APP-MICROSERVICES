# Étape de développement
FROM node:18-alpine AS development

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package.json pnpm-lock.yaml ./

# Installer PNPM globalement
RUN npm install -g pnpm

# Installer toutes les dépendances (dev + prod)
RUN pnpm install -r

# Copier le reste des fichiers nécessaires pour la compilation
COPY tsconfig.json nest-cli.json ./
COPY apps/auth ./apps/auth
COPY libs ./libs

# Compiler l'application
RUN pnpm run build auth

# Étape de production
FROM node:18-alpine AS production

# Définir la variable d'environnement
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier uniquement les fichiers nécessaires pour exécuter l'application
COPY package.json pnpm-lock.yaml ./
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules

# Commande pour démarrer l'application
CMD ["node", "dist/apps/auth/main"]
