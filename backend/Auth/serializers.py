from users.models import CustomUser
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.authtoken.models import Token


class UserRegisterSerializer(serializers.ModelSerializer):
    """
    User Register Serializer
    """
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "first_name", "last_name", "user_type", "password", "password2"]
        extra_kwargs = {
            'password': {"write_only": True}
        }

    def validate_username(self, username):
        if CustomUser.objects.filter(username=username).exists():
            detail = {
                "detail": "User Already exist!"
            }
            raise ValidationError(detail=detail)
        return username

    def validate(self, instance):
        if instance['password'] != instance['password2']:
            raise ValidationError({"message": "Both passwords must match"})

        if CustomUser.objects.filter(email=instance['email']).exists():
            raise ValidationError({"message": "Email already taken!"})

        return instance

    def create(self, validated_data: dict) -> CustomUser:
        passowrd = validated_data.pop('password')
        passowrd2 = validated_data.pop('password2')
        user = CustomUser.objects.create(**validated_data)
        user.set_password(passowrd)
        user.save()
        Token.objects.create(user=user)
        return user


class UserLoginSerializer(serializers.ModelSerializer):
    """
    User Login Serializer
    """
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    username = serializers.CharField(read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ["id", "username", "password"]


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Custom User Details Serializer
    """
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "first_name", "last_name", "user_type", "profile_picture", "date_joined", ]

