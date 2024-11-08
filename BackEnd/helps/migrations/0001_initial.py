# Generated by Django 3.2.9 on 2022-01-29 11:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('administrators', '0001_initial'),
        ('members', '0001_initial'),
        ('help_types', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Help',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('limit_date', models.DateField()),
                ('unit_amount', models.IntegerField()),
                ('amount', models.IntegerField()),
                ('comments', models.TextField(max_length=255)),
                ('state', models.IntegerField(default=1)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('administrator_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='administrators.administrator')),
                ('help_type_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='help_types.help_type')),
                ('member_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='members.member')),
            ],
        ),
    ]
