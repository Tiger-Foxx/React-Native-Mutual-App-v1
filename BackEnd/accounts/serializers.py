from rest_framework import serializers
from users.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

# User Serializer
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    # fields = ('id','name', 'email','first_name', 'tel', 'address','type')
    fields = '__all__'
class CreateSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    # fields = ('id','name', 'email','first_name', 'tel', 'address','type')
    fields = '__all__'
    extra_kwargs = {'password': {'write_only': True}}


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'
    # fields = ('id', 'name', 'email', 'password')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = User.objects.create_user(validated_data['name'], email=validated_data['email'],first_name=validated_data['first_name'],tel=validated_data['tel'],address=validated_data['address'],password = validated_data['password'],type=validated_data['type'])

    return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
  email = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError("Incorrect Credentials")

class UpdateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)


    class Meta:
        model = User
        fields = ('first_name', 'name', 'email', 'sex' , 'avatar', 'address', 'tel', 'old_password', 'password', 'password2')
        # extra_kwargs = {
        #     'first_name': {'required': True},
        #     'last_name': {'required': True},
        # }
    # def validate_email(self, value):
    #     user = self.context['request'].user
    #     if User.objects.exclude(pk=user.pk).filter(email=value).exists():
    #         raise serializers.ValidationError({"email": "This email is already in use."})
    #     return value

    # def validate_username(self, value):
    #     user = self.context['request'].user
    #     if User.objects.exclude(pk=user.pk).filter(username=value).exists():
    #         raise serializers.ValidationError({"username": "This username is already in use."})
    #     return value

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):
        instance.first_name = validated_data['first_name']
        instance.email = validated_data['email']
        instance.name = validated_data['name']

        instance.set_password(validated_data['password'])

        instance.save()

        return instance