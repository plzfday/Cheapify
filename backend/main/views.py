from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

from serialiser import ProductSerialiser
from models import Category, Product

# Create your views here.
@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get("keyword")
    if query == None:
        query = ""

    products = Product.object.filter(name__icontains=query)
    page = query = request.query_params.get('page')
    paginator = Paginator(paginator, 2)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serialiser = ProductSerialiser(products, many=True)
    return Response({'products': serialiser.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['GET'])
def getTopProducts(request):
    query = request.query_params.get("keyword")
    if query == None:
        query = ""
    products = Product.objects.filter(name__icontains=query).order_by('-price')[:2]
    serialiser = ProductSerialiser(products, many=True)
    return Response({'products': serialiser.data})
