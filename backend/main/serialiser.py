from rest_framework.serializers import ModelSerializer, SerializerMethodField
from models import Category, Product

class CategorySerialiser(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerialiser(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def get_categories(self, obj):
        categoreis = obj.category_set.all()
        serialiser = CategorySerialiser(categoreis, many=True)
        return serialiser.data
