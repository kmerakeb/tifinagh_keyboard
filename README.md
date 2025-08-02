### Tifinagh Keyboard ###

tifinagh_keyboard/
│
├── tifinagh_keyboard/
│   ├── static/
│   │   └── tifinagh_keyboard/
│   │       ├── js/
│   │       │   └── keyboard.js
│   │       └── css/
│   │           └── keyboard.css
│   ├── templates/
│   │   └── tifinagh_keyboard/
│   │       └── keyboard_widget.html
│   ├── __init__.py
│   ├── apps.py
│   ├── widgets.py
│   └── VERSION
├── setup.py
├── README.md
└── MANIFEST.in


#### Installing the package

pip install -e /path/to/tifinagh_keyboard


### In Django settings

INSTALLED_APPS = [
    ...
    'tifinagh_keyboard',
]


### Example form

from django import forms
from tifinagh_keyboard.widgets import TifinaghKeyboardWidget

class MessageForm(forms.Form):
    message = forms.CharField(widget=TifinaghKeyboardWidget())

### E#xample View

def home(request):
    form = MessageForm()
    return render(request, 'your_template.html', {'form': form})
### run this to check if your package creates all required folders

python setup.py sdist


### reinstall if issue

python setup.py sdist
pip install --force-reinstall dist/tifinagh_keyboard-<version>.tar.gz


### direct install

pip install dist/tifinagh_keyboard-0.1.0.tar.gz
