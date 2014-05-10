from django.views.generic import TemplateView


class AppView(TemplateView):
    """
    Main view of the app.
    """
    template_name = 'desert_player/index.html'
