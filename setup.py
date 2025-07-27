from setuptools import setup, find_packages

with open('VERSION') as f:
    version = f.read().strip()

setup(
    name='tifinagh_keyboard',
    version=version,
    description='A reusable Tifinagh virtual keyboard for Django forms',
    author='Kiki',
    packages=find_packages(),
    include_package_data=True,
    install_requires=['Django>=3.2'],
    classifiers=[
        'Framework :: Django',
        'Programming Language :: Python :: 3',
    ],
)
