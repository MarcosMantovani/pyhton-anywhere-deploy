from djoser.serializers import UserCreateSerializer, UserSerializer
from django.contrib.auth import get_user_model
from .models import UserAccount, Post
from rest_framework import serializers


User = get_user_model()

class userCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'username', 'password')

class CustomSociallUsersSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = UserAccount
        fields = ('id', 'username', 'name', 'profile_photo', 'follows', 'followed_by')

class CustomUserSerializer(UserSerializer):
    follows = CustomSociallUsersSerializer(many=True, read_only=True)
    followed_by = CustomSociallUsersSerializer(many=True, read_only=True)
    post_count = serializers.SerializerMethodField()

    class Meta(UserSerializer.Meta):
        model = UserAccount
        fields = ('id', 'email', 'username', 'name', 'profile_photo', 'banner', 'follows', 'followed_by', 'date_modified', 'bio', 'post_count')

    def get_post_count(self, obj):
        # Retorna a contagem de posts do usuário
        return obj.posts.count()

class PostUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'name', 'username', 'profile_photo', 'followed_by')

class PostSerializer(serializers.ModelSerializer):
    user = PostUserSerializer()
    quoted_post = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'user', 'body', 'image', 'created_at', 'likes', 'number_of_likes', 'quoted_post', 'edited')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['created_at'] = instance.get_created_at_display()
        return representation

    def get_quoted_post(self, instance):
        # Retorna a representação do post citado
        if instance.quoted_post:
            return {
                "id": instance.quoted_post.id,
                "user": {
                    "id": instance.quoted_post.user.id,
                    "name": instance.quoted_post.user.name,
                    "username": instance.quoted_post.user.username,
                    "profile_photo": instance.quoted_post.user.profile_photo.url if instance.quoted_post.user.profile_photo else None
                },
                "body": instance.quoted_post.body,
                "image": instance.quoted_post.image.url if instance.quoted_post.image else None,
                "created_at": instance.quoted_post.created_at.strftime("%d/%m/%Y %H:%M:%S"),
                "likes": instance.quoted_post.likes.count(),
                "number_of_likes": instance.quoted_post.likes.count(),
                "edited": instance.quoted_post.edited
            }
        return None

class SearchedUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'name', 'username', 'profile_photo', 'followed_by', 'follows', 'bio')
