# Generated by Django 3.0.5 on 2020-04-27 23:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
            options={
                'verbose_name': 'Project',
                'verbose_name_plural': 'Projects',
            },
        ),
        migrations.CreateModel(
            name='Facet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='facets', to='projects.Project')),
            ],
            options={
                'verbose_name': 'Facet',
                'verbose_name_plural': 'Facets',
                'unique_together': {('name', 'project')},
            },
        ),
    ]
