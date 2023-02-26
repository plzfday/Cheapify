from django.contrib import admin
from .models import Product

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'pri_key',
        'name',
        'price',
        'seller',
        'link',
        'image'
    )

    ordering = ('pri_key',)


admin.site.register(Product, ProductAdmin)