from django.db import models

# Create your models here.
class Produto(models.Model):
    nome = models.CharField(max_length=30)
    descricao = models.CharField(max_length=200)
    preco_unitario = models.FloatField()