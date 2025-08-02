from django.shortcuts import render
from .forms import DemoForm

def test_form(request):
    form = DemoForm()
    return render(request, 'demo_app/test_form.html', {'form': form})

