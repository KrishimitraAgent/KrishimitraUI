#!/bin/sh

# Substitute PORT environment variable in nginx config template
envsubst '${PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start nginx
exec nginx -g 'daemon off;' 