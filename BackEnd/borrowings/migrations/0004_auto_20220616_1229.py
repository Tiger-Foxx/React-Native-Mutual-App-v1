# Generated by Django 3.2.9 on 2022-06-16 11:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('borrowings', '0003_auto_20220612_1857'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='borrowing',
            name='amount_to_pay',
        ),
        migrations.AddField(
            model_name='borrowing',
            name='amount_paid',
            field=models.IntegerField(default=0),
        ),
    ]
