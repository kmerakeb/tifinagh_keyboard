from django import forms
from tifinagh_keyboard.widgets import TifinaghKeyboardWidget

class DemoForm(forms.Form):
    message = forms.CharField(widget=TifinaghKeyboardWidget(), label="Write in Tifinagh")
