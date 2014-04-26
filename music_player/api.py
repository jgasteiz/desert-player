from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import permissions
from rest_framework import renderers
from rest_framework import viewsets
from rest_framework.decorators import link
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from .models import Audio
from .serializers import AudioSerializer


class SongsViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Audio.objects.all()
    serializer_class = AudioSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
