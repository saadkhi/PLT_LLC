from django.db import models

# Job model
class Job(models.Model):
    JOB_MODE_CHOICES = [
        ('remote', 'Remote'),
        ('hybrid', 'Hybrid'),
        ('onsite', 'Onsite'),
    ]

    title = models.CharField(max_length=200)
    location = models.CharField(max_length=100)
    job_mode = models.CharField(max_length=10, choices=JOB_MODE_CHOICES)
    about_role = models.TextField()
    responsibilities = models.TextField()  # "What you will do"
    requirements = models.TextField()      # "What we are looking for"
    nice_to_have = models.TextField(blank=True, null=True)
    posted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


# Candidate application model
class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    email = models.EmailField()
    education_level = models.CharField(max_length=200)
    last_institute = models.CharField(max_length=200)
    github_link = models.URLField(blank=True, null=True)
    linkedin_link = models.URLField(blank=True, null=True)
    resume = models.FileField(upload_to="resumes/")
    referral_source = models.CharField(max_length=200)  # "Where did you hear about us?"

    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.job.title}"

# Contact message model
class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=250, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"

# Insight model
class Insight(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='insights/', blank=True, null=True)  # Optional image
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Industry(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='industries/', blank=True, null=True)  # Industry image
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Project(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="projects")
    title = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to='projects/')
    alt_text = models.CharField(max_length=200, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.project.title} - Image {self.order}"