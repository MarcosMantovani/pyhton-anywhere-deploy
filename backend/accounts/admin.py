from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from .models import UserAccount, Post


class CustomUserAdmin(UserAdmin):
    model = UserAccount
    list_display = ['username', 'name', 'email', 'id', 'is_staff', 'post_count']

    fieldsets = (
        (None, {'fields': ('username', 'name', 'email', 'password', 'profile_photo', 'banner', 'bio', 'post_count')}),
        ('Profile', {'fields': ('follows', 'get_followed_by',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    readonly_fields = ('get_followed_by', 'post_count',)

    def get_followed_by(self, obj):
        return ", ".join([user.username for user in obj.followed_by.all()])
    get_followed_by.short_description = 'Followed by'

    def post_count(self, obj):
        return obj.posts.count()
    post_count.short_description = 'Post count'

admin.site.unregister(Group)
admin.site.register(UserAccount, CustomUserAdmin)
admin.site.register(Post)
