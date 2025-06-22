# Projeto Web Dev Full Stack

## Desenvolvedores

- Italo Pinheiro
- Bianca Peres

## Como Buildar

Execute o docker-compose no diretório principal:

```bash
docker compose up
```

## Rodar Migrations

Entre no bash do container do backend:

```bash
docker exec -it projeto_dev_web-backend-1 bash
```

Execute o comando para gerar o script de migration:

```bash
python manage.py makemigrations <nome_do_app>
```

Execute a migration:

```bash
python manage.py migrate
```

Após finalizar, dê CTRL+D.

## Modelo Relacional

![Modelo Relacional do Projeto](/modelo_relacional.png)
