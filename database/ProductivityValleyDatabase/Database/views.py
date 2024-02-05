from django.shortcuts import render
from django import forms
from .models import Decorations
from django.template import loader
from django.http import HttpResponse

class DecorationsForm(forms.ModelForm):
    class Meta:
        model = Decorations
        fields = ['name', 'price', 'image']
def Database(request):
  template = loader.get_template('myfirst.html')
  return HttpResponse(template.render())
# Create your views here.
