"""
URL configuration for projeto_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from cliente.views import ClienteViewSet
from produtos.views import ProdutoViewSet
from pedido.views import PedidoViewSet
from pedido.views import Item_PedidoViewSet

router = DefaultRouter()

router.register(r'clientes', ClienteViewSet, basename='cliente')
router.register(r'produtos', ProdutoViewSet, basename='produto')
router.register(r'pedidos', PedidoViewSet, basename='pedido')
router.register(r'itens_pedidos', Item_PedidoViewSet, basename='item_pedido')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]
