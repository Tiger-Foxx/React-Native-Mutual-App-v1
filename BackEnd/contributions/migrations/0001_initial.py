# Generated by Django 3.2.9 on 2022-01-29 11:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('administrators', '0001_initial'),
        ('members', '0001_initial'),
        ('helps', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contribution',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('state', models.IntegerField(default=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('administrator_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='administrators.administrator')),
                ('help_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='helps.help')),
                ('member_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='members.member')),
            ],
        ),
    ]
