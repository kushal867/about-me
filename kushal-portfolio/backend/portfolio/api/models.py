from django.db import models
from django.utils.text import slugify

class Project(models.Model):
    BACKEND_CHOICES = [
        ('api', 'REST API, API Development'),
        ('django', 'Django'),
        ('microservices', 'Microservices'),
        ('database', 'Database Design'),
        ('full_stack', 'Full Stack'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    detailed_description = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=50, choices=BACKEND_CHOICES, default='api')
    tech_stack = models.JSONField(default=list, help_text='["Python", "Django", "PostgreSQL"]')
    image = models.ImageField(upload_to='projects/', null=True, blank=True)
    github_link = models.URLField(null=True, blank=True)
    live_link = models.URLField(null=True, blank=True)
    features = models.JSONField(default=list, help_text='["Feature 1", "Feature 2"]')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    featured = models.BooleanField(default=False)
    views = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Projects'
    
    def __str__(self):
        return self.title


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('backend', 'Backend'),
        ('database', 'Database'),
        ('api', 'API'),
        ('tools', 'Tools & DevOps'),
        ('architecture', 'Architecture'),
    ]
    
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    proficiency = models.IntegerField(default=70, help_text='Percentage 0-100')
    icon = models.CharField(max_length=50, null=True, blank=True)
    
    class Meta:
        ordering = ['category', '-proficiency']
        verbose_name_plural = 'Skills'
    
    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


class Experience(models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    description = models.TextField()
    tech_used = models.JSONField(default=list)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-start_date']
        verbose_name_plural = 'Experience'
    
    def __str__(self):
        return f"{self.title} at {self.company}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=300)
    message = models.TextField()
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Contact Messages'
    
    def __str__(self):
        return f"Message from {self.name} - {self.subject}"


class BlogPost(models.Model):
    title = models.CharField(max_length=300)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    summary = models.CharField(max_length=500)
    tags = models.JSONField(default=list)
    published = models.BooleanField(default=False)
    views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Blog Posts'
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title


class Statistic(models.Model):
    label = models.CharField(max_length=100)
    value = models.CharField(max_length=50)
    icon = models.CharField(max_length=50, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    
    class Meta:
        verbose_name_plural = 'Statistics'
    
    def __str__(self):
        return f"{self.label}: {self.value}"