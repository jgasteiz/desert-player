from django.views.generic import ListView, TemplateView, DetailView

from core.models import Video


class HomeView(TemplateView):
    template_name = 'web/home.html'


class VideoListView(ListView):
    model = Video
    template_name = 'web/video_list.html'


class VideoDetailView(DetailView):
    model = Video
    template_name = 'web/video_detail.html'
