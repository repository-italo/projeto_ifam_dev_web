from rest_framework import serializers
from .models import Pedido
from .models import Item_Pedido

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'

class Item_PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item_Pedido
        fields = '__all__'