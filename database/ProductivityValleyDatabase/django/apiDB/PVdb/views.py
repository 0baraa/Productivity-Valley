from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response

class UsersView(APIView):
    def get(self, request):
        output = [{"firstName":output.firstName,
                  "lastName":output.lastName,
                  "username":output.username,
                  "email":output.email,
                  "money":output.money}
                  for output in Users.objects.all()]
        return Response(output)
    def post (self, request):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)



# Create your views here.
