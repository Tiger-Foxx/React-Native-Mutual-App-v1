# Generated by Django 3.2.9 on 2022-01-31 08:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('exercises', '0001_initial'),
        ('administrators', '0001_initial'),
        ('borrowings', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Refund',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField()),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('administrator_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='administrators.administrator')),
                ('borrowing_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='borrowings.borrowing')),
                ('exercise_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='exercises.exercise')),
            ],
        ),
    ]
