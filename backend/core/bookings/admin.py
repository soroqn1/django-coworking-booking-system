from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'workspace', 'start_time', 'end_time', 'status')
    list_filter = ('status', 'start_time', 'end_time')
    search_fields = ('user__username', 'workspace__name')
    ordering = ('-start_time',)