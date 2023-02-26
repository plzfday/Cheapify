from django.urls import path
from . import views

app_name = "main"

urlpatterns = [
    path('api/products', views.getProducts, name="products"),
    path('api/products/top', views.getTopProducts, name="top-products"),
]
