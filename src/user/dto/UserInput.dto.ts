import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

@InputType()
export class UserRegisterInputDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  Fullname: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @Field()
  @IsNotEmpty()
  @IsStrongPassword()
  Password: string;
}

@InputType()
export class SendOTPInputDto {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  Email: string;
}

@InputType()
export class VerifyEmailInputDto {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  OTP: string;
}

@InputType()
export class LoginInputDto {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  Password: string;
}

@InputType()
export class ChangePasswordInputDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  Password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  NewPassword: string;
}

@InputType()
export class ChangeEmailInputDto {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  NewEmail: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  Password: string;
}

@InputType()
export class UpdateUserInputDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  Fullname: string;
}

@InputType()
export class ForgotPasswordInputDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  Email: string;
}

@InputType()
export class ResetPasswordInputDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  Email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  OTP: string;

  @Field()
  @IsNotEmpty()
  @IsStrongPassword()
  Password: string;
}
