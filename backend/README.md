# Resumo backend

No backend usamos Python e o Framework Django e para criação de API usamos a ferramenta Django Rest Framework, já a arquitetura utilizada foi a MTV que é Model-Template-View. A camada Models é onde definimos a estrutura dos dados e os relacionamentos como no Model Item_Pedido que podemos observar mais de um relacionamento.

A camada Views é onde acontece a lógica de processamento de requisições, interagindo também com os Models criados e transformando os dados para enviar respostas com os serializers. Os serializers, ss̃o repsonsśveis na view por fazer essa transformação de dados e também implicitamente traz o conceito de Template já que renderiza os dados para o Angular poder consumir, já as ViewSets simplificam a criação da API, pois oferecem uma forma padronizada de lidar com operações comuns de API, o que foi usado no projeto é o ModelViewSet, que é o mais comum e inclui as operações de CRUD completas necessárias.

A camada Url é onde mapeamos as requisições recebidas para as views apropriadas quando foi registrado um ModelViewSet dentro da camada URL foi registrado um router que que inspeciona e faz com que ele gere automaticamente alguns Endpoints para API que são as operações de CRUD cada uma com sua rota e de acordo com a Quantidade inspecionada no ViewSet.
