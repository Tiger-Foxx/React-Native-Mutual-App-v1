# Generated by Django 3.2.9 on 2022-06-12 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('borrowings', '0002_borrowing_session_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='borrowing',
            name='amount',
        ),
        migrations.AddField(
            model_name='borrowing',
            name='amount_borrowed',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='borrowing',
            name='amount_to_pay',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='borrowing',
            name='payment_date_line',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='borrowing',
            name='state',
            field=models.IntegerField(default=0),
        ),
    ]
