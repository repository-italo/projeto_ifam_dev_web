from rest_framework.viewsets import ModelViewSet

from .models import Pedido
from .serializers import PedidoSerializer

from .models import Item_Pedido
from .serializers import Item_PedidoSerializer

class PedidoViewSet(ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class Item_PedidoViewSet(ModelViewSet):
    queryset = Item_Pedido.objects.all()
    serializer_class = Item_PedidoSerializer