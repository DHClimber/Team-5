# Generated by Django 4.2.6 on 2023-11-13 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_user_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='first_name',
            field=models.CharField(default='', max_length=30),
        ),
        migrations.AddField(
            model_name='user',
            name='last_name',
            field=models.CharField(default='', max_length=30),
        ),
        migrations.AddField(
            model_name='user',
            name='phone_number',
            field=models.CharField(default='', max_length=10),
        ),
    ]