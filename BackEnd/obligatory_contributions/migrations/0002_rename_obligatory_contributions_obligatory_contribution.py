# Generated by Django 3.2.9 on 2022-06-12 16:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('administrators', '0001_initial'),
        ('members', '0001_initial'),
        ('sessions_', '0002_alter_session_date'),
        ('obligatory_contributions', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Obligatory_Contributions',
            new_name='Obligatory_Contribution',
        ),
    ]
