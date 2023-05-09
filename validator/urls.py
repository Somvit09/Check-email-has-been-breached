from django.urls import path
from . import views

urlpatterns = [
    path('<str:email>/', views.check_if_email_hacked, name='check_if_email_hacked'),
]
