from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.contrib import admin
from accounts.views import UserDetailView, follow_user, unfollow_user, get_posts, get_followed_users_posts, create_post, update_profile_photo, update_banner, like_post, update_bio, delete_post, edit_post, search_posts, search_users, update_name
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('user/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('user/follow/', follow_user, name='follow-user'),
    path('user/unfollow/', unfollow_user, name='unfollow-user'),
    path('user/update-profile-photo/', update_profile_photo, name='update-profile-photo'),
    path('user/update-banner/', update_banner, name='update-banner'),
    path('user/update-bio/', update_bio, name='update-bio'),
    path('user/update-name/', update_name, name='update-name'),
    path('posts/', get_posts, name='get-posts'),
    path('posts/<int:user_id>/', get_posts, name='get-posts'),
    path('followed-users-posts/', get_followed_users_posts, name='get-followed-users-posts'),
    path('create-post/', create_post, name='create-post'),
    path('like-post/', like_post, name='like-post'),
    path('delete-post/', delete_post, name='delete-post'),
    path('edit-post/', edit_post, name='edit-post'),
    path('search-posts/<str:search_text>/', search_posts, name='search-posts'),
    path('search-posts/', search_posts, name='search-posts'),
    path('search-users/<str:search_text>/', search_users, name='search-users'),
    path('search-users/', search_users, name='search-users'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
