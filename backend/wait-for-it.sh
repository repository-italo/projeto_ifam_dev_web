#!/bin/bash

# Parâmetros de conexão
HOST="${DB_HOST:-database}"
USER="${DB_USER:-root}"
PASSWORD="${DB_PASSWORD:-root}"
PORT="${DB_PORT:-3306}"

echo "🔎 Aguardando o MySQL iniciar em $HOST:$PORT..."

until mysqladmin ping -h"$HOST" -P"$PORT" -u"$USER" -p"$PASSWORD" --silent; do
    echo "⏳ MySQL ainda não está pronto... aguardando..."
    sleep 2
done

echo "✅ MySQL está pronto! Continuando..."
exec "$@"