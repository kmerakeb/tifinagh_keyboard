from django.forms.widgets import TextInput
from django.template.loader import render_to_string

class TifinaghKeyboardWidget(TextInput):
    template_name = 'tifinagh_keyboard/keyboard_widget.html'

    class Media:
        js = ['tifinagh_keyboard/js/keyboard.js']
        css = {
            'all': ['tifinagh_keyboard/css/keyboard.css']
        }

    def get_context(self, name, value, attrs):
        context = super().get_context(name, value, attrs)
        return context
