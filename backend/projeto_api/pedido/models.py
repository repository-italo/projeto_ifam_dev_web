from django.db import models

from cliente.models import Cliente
from produtos.models import Produto

# Create your models here.
class Pedido(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name="clientes")

class Item_Pedido(models.Model):
    preco_unitario = models.FloatField()
    quantidade = models.IntegerField()
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE, related_name="produtos")
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name="pedidos")