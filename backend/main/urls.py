from django.urls import path
import views

urlpatterns = [
    path('api/products', views.getProducts, name="products"),
    path('api/products/top', views.getTopProducts, name="top-products"),
]