from rest_framework import serializers
from ..models import User


class TeacherSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'bio', 'password1', 'password2', 'is_student', 'is_teacher']
        read_only_fields = ['id', 'is_student', 'is_teacher']
    
    def create(self, validated_data):
        password1 = validated_data.pop('password1')
        password2 = validated_data.pop('password2')
        is_student = validated_data.pop('is_student', False)
        is_teacher = validated_data.pop('is_teacher', True)

        if password1 != password2:
            raise serializers.ValidationError("Passwords do not match")

        user = User(**validated_data)
        user.set_password(password1)
        user.is_student = is_student
        user.is_teacher = is_teacher
        user.save()
        return user


class StudentSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password1', 'password2', 'is_student']
        read_only_fields = ['id', 'is_student']

    def create(self, validated_data):
        password1 = validated_data.pop('password1')
        password2 = validated_data.pop('password2')

        if password1 != password2:
            raise serializers.ValidationError("Passwords do not match")

        user = User(**validated_data)
        user.set_password(password1)
        user.is_student = True
        user.save()
        return user


class UserRegistrationSerializer(serializers.Serializer):
    is_student = serializers.BooleanField(required=False)
    is_teacher = serializers.BooleanField(required=False)

    def validate(self, data):
        is_student = data.get('is_student', False)
        is_teacher = data.get('is_teacher', False)

        if is_student and is_teacher:
            raise serializers.ValidationError("User cannot be both student and teacher")

        if not is_student and not is_teacher:
            raise serializers.ValidationError("User must be either student or teacher")

        return data

    def create(self, validated_data):
        is_student = validated_data.get('is_student', False)
        is_teacher = validated_data.get('is_teacher', False)

        if is_student:
            serializer = StudentSerializer(data=self.initial_data)
        else:
            serializer = TeacherSerializer(data=self.initial_data)

        serializer.is_valid(raise_exception=True)
        return serializer.save()
