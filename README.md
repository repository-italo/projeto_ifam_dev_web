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

## Como buildar sem o Docker

Rode o comando para a pasta frontend:

```bash
npx ng s
```

E para o backend o comando (dentro da pasta backend/projeto_api):

```bash
python manage.py runserver 0.0.0.0:8000
```

OBS: Esse projeto usa uma versão legada do Angular (Angular V13). Recomenda-se usar a versão 16 do Node para rodar local. Provavelmente o frontend também funciona na versão Node 22.

# API - Projeto IFAM

Esta API segue o padrão REST e expõe endpoints para gerenciamento de **Clientes**, **Produtos**, **Pedidos** e **Itens de Pedido**.

Base URL:

```
/api/
```

---

## Endpoints

### Clientes

- **Listar clientes**
  - `GET /api/clientes/`
- **Criar cliente**
  - `POST /api/clientes/`
- **Buscar cliente por ID**
  - `GET /api/clientes/{id}/`
- **Atualizar cliente**
  - `PUT /api/clientes/{id}/`
- **Deletar cliente**
  - `DELETE /api/clientes/{id}/`

---

### Produtos

- **Listar produtos**
  - `GET /api/produtos/`
- **Criar produto**
  - `POST /api/produtos/`
- **Buscar produto por ID**
  - `GET /api/produtos/{id}/`
- **Atualizar produto**
  - `PUT /api/produtos/{id}/`
- **Deletar produto**
  - `DELETE /api/produtos/{id}/`

---

### Pedidos

- **Listar pedidos**
  - `GET /api/pedidos/`
- **Criar pedido**
  - `POST /api/pedidos/`
- **Buscar pedido por ID**
  - `GET /api/pedidos/{id}/`
- **Atualizar pedido**
  - `PUT /api/pedidos/{id}/`
- **Deletar pedido**
  - `DELETE /api/pedidos/{id}/`

---

### Itens de Pedido

- **Listar itens de pedido**
  - `GET /api/itens_pedidos/`
- **Criar item de pedido**
  - `POST /api/itens_pedidos/`
- **Buscar item de pedido por ID**
  - `GET /api/itens_pedidos/{id}/`
- **Atualizar item de pedido**
  - `PUT /api/itens_pedidos/{id}/`
- **Deletar item de pedido**
  - `DELETE /api/itens_pedidos/{id}/`
- **Criar vários itens de pedido em lote**
  - `POST /api/itens_pedidos/bulk_create/`
    - Corpo: lista de objetos de item de pedido

---

# Frontend - Telas

O frontend foi desenvolvido em Angular e utiliza PrimeNG para os componentes visuais.  
A navegação principal é feita pelas rotas abaixo:

---

## Clientes

- **Listar Clientes**
  - Rota: `/clientes`
  - Exibe todos os clientes cadastrados, permite editar, excluir e acessar os pedidos de cada cliente.
- **Criar/Editar Cliente**
  - Rota: `/clientes/manage` (criação)
  - Rota: `/clientes/manage/:id` (edição)
  - Formulário para cadastrar ou editar um cliente.

---

## Produtos

- **Listar Produtos**
  - Rota: `/produtos`
  - Exibe todos os produtos cadastrados, permite editar e excluir.
- **Criar/Editar Produto**
  - Rota: `/produtos/manage` (criação)
  - Rota: `/produtos/manage/:id` (edição)
  - Formulário para cadastrar ou editar um produto.

---

## Pedidos

- **Listar Pedidos**
  - Rota: `/pedidos`
  - Exibe todos os pedidos cadastrados, permite editar e excluir.
- **Listar Pedidos de um Cliente**
  - Rota: `/pedidos/:clientId`
  - Exibe apenas os pedidos do cliente selecionado.
- **Criar/Editar Pedido**
  - Rota: `/pedidos/manage/create` (criação)
  - Rota: `/pedidos/manage/:id` (edição)
  - Formulário para cadastrar ou editar um pedido, com seleção de cliente e inclusão de itens (produto e quantidade).

---

## Observações

- Todas as telas utilizam componentes do PrimeNG para melhor experiência do usuário.
- A navegação entre as telas é feita por meio de botões de ação (ex: "Adicionar", "Editar", "Excluir", "Ver pedidos").
- O gerenciamento de itens de pedido é feito dentro da tela de criação/edição de pedido.

---

## Observações

- Todos os endpoints aceitam e retornam dados em JSON.
- Para o endpoint de criação em lote (`bulk_create`), envie um array de objetos conforme o modelo do Item de Pedido.
- Os endpoints seguem o padrão do Django REST Framework.

## Modelo Relacional

![Modelo Relacional do Projeto](/modelo_relacional.png)
