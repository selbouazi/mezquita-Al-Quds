#!/bin/sh
set -e

if [ ! -f /app/.env ]; then
    cp /app/.env.docker /app/.env
fi

php /app/artisan migrate --force --isolated || true
php /app/artisan config:cache
php /app/artisan route:cache
php /app/artisan view:cache

exec /usr/bin/supervisord -c /etc/supervisord.conf
