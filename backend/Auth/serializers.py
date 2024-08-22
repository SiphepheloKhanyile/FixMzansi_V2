"""
Serializers for User Authentication
"""
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
        """
        Check if the username already exists
        """
        if CustomUser.objects.filter(username=username).exists():
            detail = {
                "detail": "User Already exist!"
            }
            raise ValidationError(detail=detail)
        return username

    def validate(self, instance):
        """
        Check if the passwords match
        """
        if instance['password'] != instance['password2']:
            raise ValidationError({"message": "Both passwords must match"})

        if CustomUser.objects.filter(email=instance['email']).exists():
            raise ValidationError({"message": "Email already taken!"})

        return instance

    def create(self, validated_data: dict) -> CustomUser:
        """
        Create a new user
        """
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


class UserUpdateSerializer(serializers.ModelSerializer):
    """
    User Update Serializer
    """
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()

    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "first_name", "last_name", "user_type"]

    def update(self, instance: CustomUser, validated_data: dict) -> CustomUser:
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance


class UserUpdatePasswordSerializer(serializers.Serializer):
    """
    User Update Password Serializer
    """
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Both passwords must match")
        return attrs

    # def update(self, instance: CustomUser, validated_data: dict) -> CustomUser:
    #     old_password = validated_data.pop('old_password')
    #     new_password = validated_data.pop('new_password')
    #     if not instance.check_password(old_password):
    #         raise serializers.ValidationError("Invalid old password")
    #     instance.set_password(new_password)
    #     instance.save()
    #     return instance
