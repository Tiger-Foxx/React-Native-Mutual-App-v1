# Generated by Django 3.2.9 on 2022-01-29 11:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Config',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('interest_per_borrow', models.IntegerField(default=10)),
                ('inscription_per_member', models.IntegerField(default=10000)),
                ('social_funds_per_member', models.IntegerField(default=20000)),
            ],
        ),
    ]
