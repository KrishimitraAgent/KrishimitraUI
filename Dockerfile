# ---------- deps layer (cached) ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Copy only package manifests to leverage caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --no-audit --fund=false

# ---------- build layer ----------
FROM node:20-alpine AS build
WORKDIR /app

# Copy installed dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Vite app -> outputs to /app/dist
ENV NODE_ENV=production
RUN npm run build

# ---------- runtime layer (tiny, no Node) ----------
FROM nginx:1.27-alpine AS runtime

# Non-root user for security
RUN adduser -D -H -u 1001 appuser \
  && mkdir -p /var/cache/nginx /var/run /var/log/nginx \
  && chown -R appuser:appuser /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html /etc/nginx \
  && touch /var/run/nginx.pid \
  && chown appuser:appuser /var/run/nginx.pid

# Remove default html and copy build
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx template and startup script
COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY start-nginx.sh /usr/local/bin/start-nginx.sh

# Make startup script executable and set default PORT
RUN chmod +x /usr/local/bin/start-nginx.sh
ENV PORT=8080

USER appuser
EXPOSE 8080
CMD ["/usr/local/bin/start-nginx.sh"]
