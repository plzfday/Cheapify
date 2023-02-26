from django.db import models

# Create your models here.
class Product(models.Model):
    pri_key = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    price_per_unit = models.DecimalField(max_digits=5, decimal_places=2)
    seller = models.CharField(max_length=20)
    link = models.URLField(max_length=200)
    image = models.URLField(max_length=200)

    def __str__(self):
        return self.name


class Category(models.Model):
    pri_key = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    products = models.ManyToManyField(Product)

    def __str__(self):
        return self.name