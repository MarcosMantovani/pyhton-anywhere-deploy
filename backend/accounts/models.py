from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone
from datetime import timedelta
from django.utils.timezone import localtime


class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, username, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have as email address')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, username=username, **extra_fields)

        user.set_password(password)
        user.save(using=self._db) # Se houver algum erro, alterar para sem parametro

        return user

    def create_superuser(self, email, name, username, password=None):
        user = self.create_user(email, name, username, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    follows = models.ManyToManyField("self",
                                    related_name="followed_by",
                                    symmetrical=False,
                                    blank=True)
    date_modified = models.DateTimeField(auto_now=True)
    profile_photo = models.ImageField(null=True, blank=True, upload_to='images')
    banner = models.ImageField(null=True, blank=True, upload_to='images')
    bio = models.CharField(null=True, blank=True, max_length=200)

    objects = UserAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['name', 'email']

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def get_email(self):
        return self.email

    def __str__(self):
        return self.username

class Post(models.Model):
    user = models.ForeignKey(
        UserAccount, related_name="posts",
        on_delete=models.CASCADE
    )
    body = models.CharField(max_length=200)
    image = models.ImageField(null=True, blank=True, upload_to='images')
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(UserAccount, related_name="post_like", blank=True)
    quoted_post = models.ForeignKey(
        'self', related_name='quotes',
        on_delete=models.SET_NULL, null=True, blank=True
    )
    edited = models.BooleanField(default=False)

    def number_of_likes(self):
        return self.likes.count()

    def get_post(self):
        return {
            "id": self.id,
            "body": self.body,
            "image": self.image,
            "created_at": self.created_at.strftime("%d/%m/%Y %H:%M:%S"),
        }

    def get_created_at_display(self):
        # Calcula a diferença entre o momento atual e o momento de criação do post
        time_difference = timezone.now() - self.created_at

        # Verifica se o post foi criado há menos de um mês
        if time_difference <= timedelta(days=30):
            # Calcula as horas e minutos desde a criação do post
            days, seconds = divmod(time_difference.total_seconds(), 86400)
            hours, remainder = divmod(seconds, 3600)
            minutes, _ = divmod(remainder, 60)
            if days > 0:
                return f"{int(days)} dias atrás"
            elif hours > 0:
                return f"{int(hours)}hrs atrás"
            else:
                return f"{int(minutes)}min atrás"
        else:
            # Retorna a data e hora no horário de Brasília
            return localtime(self.created_at).strftime("%d/%m/%Y %H:%M")


    def __str__(self):
        return (
            f"{self.id}: "
            f"{self.user} "
            f"({self.created_at:%d-%m-%Y %H:%M}): "
            f"{self.body}"
        )
