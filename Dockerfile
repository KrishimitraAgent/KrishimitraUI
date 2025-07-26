# ---- Build stage ----
FROM node:20-alpine AS build

WORKDIR /app
# Copy only the files needed for dependency resolution first (better cache)
COPY package*.json ./
# If you use pnpm/yarn, swap the following line accordingly (and add lockfiles).
RUN npm ci

# Copy the rest and build
COPY . .
# CRA: npm run build | Vite: npm run build
RUN npm run build

# ---- Run stage (Nginx) ----
FROM nginx:1.27-alpine

# Remove default nginx static assets & copy the build
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

# (Optional) Custom nginx config for SPA routing (uncomment COPY below and include nginx.conf)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
# Cloud Run listens on $PORT, so adapt nginx to it via env var (see nginx.conf sample below)
CMD ["nginx", "-g", "daemon off;"]
