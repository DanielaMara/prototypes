from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    context = {
        'course_name': 'Python e Django na Prática ;)',
        'alunos': [
            {
                'name': 'Daniela',
                'age': 17
            },
            {
                'name': 'Mara',
                'age': 20
            },
            {
                'name': 'Silva',
                'age': 25
            },
            {
                'name': 'Maria',
                'age': 30
            }
        ]
    }

    return render(request, 'hello.html', context)
