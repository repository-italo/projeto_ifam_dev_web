FROM python:3.11-slim

# Variáveis de ambiente para melhorar o comportamento do Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Instalar dependências de sistema
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    python3-dev \
    default-libmysqlclient-dev \
    default-mysql-client \
    build-essential \
    pkg-config \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Criar diretório de trabalho
WORKDIR /app

# Copiar apenas os requirements primeiro (melhor para cache)
COPY requirements.txt .

# Instalar as dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o restante da aplicação
COPY . /app/

# Mudar para o diretório onde está o manage.py
WORKDIR /app/projeto_api

# Expor a porta 8000 (usada pelo Gunicorn)
EXPOSE 8000

# Comando padrão para produção
CMD ["gunicorn", "projeto_api.wsgi:application", "--bind", "0.0.0.0:8000"]
