from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet, SkillViewSet, ExperienceViewSet,
    ContactMessageViewSet, BlogPostViewSet, StatisticViewSet
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'experience', ExperienceViewSet, basename='experience')
router.register(r'contact', ContactMessageViewSet, basename='contact')
router.register(r'blog', BlogPostViewSet, basename='blog')
router.register(r'statistics', StatisticViewSet, basename='statistic')

urlpatterns = [
    path('', include(router.urls)),
]