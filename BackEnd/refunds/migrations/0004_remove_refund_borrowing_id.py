# Generated by Django 3.2.9 on 2022-02-02 14:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('refunds', '0003_auto_20220202_1516'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='refund',
            name='borrowing_id',
        ),
    ]
