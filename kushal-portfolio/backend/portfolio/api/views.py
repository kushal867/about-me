from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.conf import settings
from .models import Project, Skill, Experience, ContactMessage, BlogPost, Statistic
from .serializers import (
    ProjectSerializer, SkillSerializer, ExperienceSerializer,
    ContactMessageSerializer, BlogPostSerializer, StatisticSerializer
)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['title', 'description', 'category', 'tech_stack']
    ordering_fields = ['created_at', 'featured', 'views']
    
    @action(detail=False, methods=['GET'])
    def featured(self, request):
        """Get featured projects only"""
        featured_projects = Project.objects.filter(featured=True)
        serializer = self.get_serializer(featured_projects, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['POST'])
    def increment_views(self, request, pk=None):
        """Increment view count for a project"""
        project = self.get_object()
        project.views += 1
        project.save()
        return Response({'views': project.views})


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [AllowAny]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name', 'category']
    ordering_fields = ['category', 'proficiency']
    
    @action(detail=False, methods=['GET'])
    def by_category(self, request):
        """Get skills grouped by category"""
        category = request.query_params.get('category')
        if category:
            skills = Skill.objects.filter(category=category)
        else:
            skills = Skill.objects.all()
        
        grouped = {}
        for skill in skills:
            cat = skill.get_category_display()
            if cat not in grouped:
                grouped[cat] = []
            grouped[cat].append(SkillSerializer(skill).data)
        
        return Response(grouped)


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [AllowAny]
    ordering_fields = ['start_date']
    
    @action(detail=False, methods=['GET'])
    def current(self, request):
        """Get current experience"""
        current_exp = Experience.objects.filter(is_current=True)
        serializer = self.get_serializer(current_exp, many=True)
        return Response(serializer.data)


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.filter(published=True)
    serializer_class = BlogPostSerializer
    permission_classes = [AllowAny]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['title', 'tags', 'content']
    ordering_fields = ['created_at', 'views']
    
    @action(detail=True, methods=['POST'])
    def increment_views(self, request, pk=None):
        """Increment blog post views"""
        post = self.get_object()
        post.views += 1
        post.save()
        return Response({'views': post.views})


class StatisticViewSet(viewsets.ModelViewSet):
    queryset = Statistic.objects.all()
    serializer_class = StatisticSerializer
    permission_classes = [AllowAny]


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        """Create contact message and send email"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Send email notification
        try:
            send_mail(
                subject=f"New Portfolio Contact: {serializer.data['subject']}",
                message=f"From: {serializer.data['email']}\n\nMessage:\n{serializer.data['message']}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Email sending failed: {e}")
        
        return Response(
            {
                'message': 'Message sent successfully! I will get back to you soon.',
                'data': serializer.data
            },
            status=status.HTTP_201_CREATED
        )