from django.views.generic import TemplateView


class HomeView(TemplateView):
    template_name = 'music_player/index.html'
