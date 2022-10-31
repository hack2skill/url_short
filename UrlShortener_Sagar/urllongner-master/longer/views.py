from django.shortcuts import redirect, render
from .models import Longerurl
from django.core.validators import URLValidator
import random
import string
# Create your views here.
def url_longener(request):
    if request.method == 'POST':
        url = request.POST['url']
        validate = URLValidator()
        try:
            validate(url)
        except:
            return render(request, 'longer/url_longener.html', {'error': 'Invalid URL'})
        if len(url) > 0:
            slug = ''.join(random.choice(string.ascii_letters) for i in range(800))
            l = Longerurl(url=url, slug=slug)
            l.save()
            x = '127.0.0.1:8000/'+slug
            return render(request, 'longer/url_longener.html', {'slug': x})
        else:
            return render(request, 'longer/url_longener.html', {'error': 'Please enter a valid URL'})
    return render(request, 'longer/url_longener.html')
def url_redirect(request, slugs):
    print(slugs)
    try:
        l = Longerurl.objects.get(slug=slugs)
        print(l.url)
        print(l.url)
        return redirect(l.url)
    except:
        return render(request, 'longer/url_redirect.html', {'error': 'Invalid URL'})
