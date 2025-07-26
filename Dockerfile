# ---------- deps layer (cached) ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Copy only lockfiles & package manifest to maximize cache hits
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Choose one of the following (auto-works if only one lockfile exists):
# npm
RUN npm ci --no-audit --fund=false
# yarn (uncomment if you use yarn)
# RUN yarn install --frozen-lockfile
# pnpm (uncomment if you use pnpm)
# RUN corepack enable && pnpm install --frozen-lockfile

# ---------- build layer ----------
FROM node:20-alpine AS build
WORKDIR /app

# Reuse deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Vite app -> outputs to /app/dist
ENV NODE_ENV=production
RUN npm run build
# If yarn: RUN yarn build
# If pnpm: RUN pnpm build

# ---------- runtime layer (tiny, no Node) ----------
FROM nginx:1.27-alpine AS runtime

# Run as non-root (Cloud Run friendly)
# nginx user already exists, but we’ll create our own unprivileged user with uid 1001
RUN adduser -D -H -u 1001 appuser \
  && mkdir -p /var/cache/nginx /var/run \
  && chown -R appuser:appuser /var/cache/nginx /var/run /usr/share/nginx/html /etc/nginx

# Clean default html & copy our build
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

# Custom nginx config for SPA + port 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf

USER appuser
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
