from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from .models import Pedido
from .serializers import PedidoSerializer
from rest_framework import status, response

from .models import Item_Pedido
from .serializers import Item_PedidoSerializer

class PedidoViewSet(ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class Item_PedidoViewSet(ModelViewSet):
    queryset = Item_Pedido.objects.all()
    serializer_class = Item_PedidoSerializer

    @action(detail=False, methods=['post'])
    def bulk_create(self, request):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        Item_Pedido.objects.bulk_create([
            Item_Pedido(**item) for item in serializer.validated_data
        ])
        return response.Response(serializer.data, status=status.HTTP_201_CREATED)