from django import forms
from .models import Application, ContactMessage

class ApplicationForm(forms.ModelForm):
    class Meta:
        model = Application
        fields = [
            'name', 'age', 'email', 'education_level', 'last_institute',
            'github_link', 'linkedin_link', 'resume', 'referral_source'
        ]


class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "subject", "message"]

        widgets = {
            "name": forms.TextInput(attrs={
                "class": "w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500",
                "placeholder": "Full Name"
            }),
            "email": forms.EmailInput(attrs={
                "class": "w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500",
                "placeholder": "Email Address"
            }),
            "subject": forms.TextInput(attrs={
                "class": "w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500",
                "placeholder": "Subject"
            }),
            "message": forms.Textarea(attrs={
                "rows": 4,
                "class": "w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500",
                "placeholder": "Your Message"
            }),
        }