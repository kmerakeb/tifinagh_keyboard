from django.urls import path
from .views import test_form

urlpatterns = [
    path('', test_form, name='test_form'),
]
