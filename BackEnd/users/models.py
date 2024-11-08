from django.db import models
from django.contrib import auth
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

def upload_to(instance, filename):
    return 'posts/{filename}'.format(filename=filename)

class CustomAccountManager(BaseUserManager):

    def create_user(self, name, email, password=None, **other_fields):
        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(name=name, email=email, **other_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, name, email, password=None, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(name, email, password, **other_fields)


class User(AbstractBaseUser):
    name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=30)
    type = models.CharField(max_length=30, default='member')
    sex = models.CharField(max_length=8, blank=True)
    email = models.EmailField(max_length=100, unique=True)
    avatar = models.ImageField(_("Image"), upload_to=upload_to, default='posts/default.jpg')
    tel = models.CharField(max_length=9)
    address = models.CharField(max_length=50)
    create_at = models.DateTimeField(auto_now_add=True)
    
    is_staff = models.BooleanField(default=False)  # Ajout pour la gestion des permissions
    is_superuser = models.BooleanField(default=False)  # Ajout pour la gestion des permissions

    objects = CustomAccountManager()

    REQUIRED_FIELDS = ['name']
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.name

    # Permissions
    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser


