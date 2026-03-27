from django.conf import settings
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib import messages

from . import forms
from . import models

def home(request):
    return render(request, 'homepage.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    if request.method == "POST":
        form = forms.ContactForm(request.POST)
        if form.is_valid():
            contact_message = form.save()

            # Send email to sales department
            subject = f"New Contact Form Submission: {contact_message.subject or 'No Subject'}"
            message = f"""
            Name: {contact_message.name}
            Email: {contact_message.email}
            Message:
            {contact_message.message}
            """
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                ["saadali598@yahoo.com"],  # ✅ change to your sales email
                fail_silently=False,
            )
            messages.success(request, "Your message has been sent successfully!")
            return redirect(request.META.get("HTTP_REFERER", "contact"))
    else:
        form = forms.ContactForm()

    return render(request, "contact.html", {"form": form})

def careers(request):
    jobs = models.Job.objects.all().order_by('-posted_at')
    return render(request, 'careers.html', {'jobs': jobs})

def services(request):
    return render(request, 'services.html')

def industries(request):
    industries_list = models.Industry.objects.all().order_by('name')
    return render(request, 'industries.html', {'industries': industries_list})

def insights(request):
    insights_list = models.Insight.objects.all().order_by('-created_at')
    return render(request, 'insights.html', {'insights': insights_list})

def insight_detail(request, insight_id):
    insight = get_object_or_404(models.Insight, pk=insight_id)
    return render(request, 'insight_detail.html', {'insight': insight})

# Job Detail + Application Form
def job_detail(request, job_id):
    job = get_object_or_404(models.Job, id=job_id)

    if request.method == "POST":
        form = forms.ApplicationForm(request.POST, request.FILES)
        if form.is_valid():
            application = form.save(commit=False)
            application.job = job
            application.save()
            return redirect('careers')  # After submission, go back to job list
    else:
        form = forms.ApplicationForm()

    return render(request, 'job_detail.html', {'job': job, 'form': form})

def project_category(request, category_id):
    category = get_object_or_404(models.Category, id=category_id)
    projects = category.projects.prefetch_related('images').all()  # prefetch images for better performance
    return render(request, "project_category.html", {"category": category, "projects": projects})