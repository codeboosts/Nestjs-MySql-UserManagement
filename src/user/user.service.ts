import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRegisterInputDto, VerifyEmailInputDto, ChangePasswordInputDto, ChangeEmailInputDto, LoginInputDto, UpdateUserInputDto, ForgotPasswordInputDto, ResetPasswordInputDto, SendOTPInputDto } from './dto/UserInput.dto';
import { RedisService } from '../redis/redis.service';
import { MessageOutput, SuccessOutput } from '../common/dto/CommonOutput.dto';
import { User } from './entities/user.entity';
import { onComparePassword, onHashPassword } from 'src/utilities/bcrypt';
import { onGenerateOTP } from 'src/utilities/generateOTP';
import { onSendOtpToMail } from 'src/utilities/sendOTP';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly redisService: RedisService) {}

  async register(input: UserRegisterInputDto): Promise<MessageOutput> {
    const userExist = await this.getByEmail(input.Email);
    if (userExist) throw new NotFoundException('Email already registered');

    const user = new User();
    user.email = input.Email;
    user.fullname = input.Fullname;
    user.password = input.Password;

    await user.save();

    const otp = onGenerateOTP(6);
    await this.storeAndSendOTP(input.Email, otp);

    return { message: 'Check your mailbox' };
  }

  async storeAndSendOTP(email: string, otp: string): Promise<void> {
    console.log(`Stored OTP for ${email}: ${otp} (placeholder)`);
    await this.redisService.storeValueInTempStore(otp, email, 600, true);

    await onSendOtpToMail(email, otp);
  }

  async verifyEmail(input: VerifyEmailInputDto): Promise<SuccessOutput> {
    await this.validateOTP(input.Email, input.OTP);

    await this.updateVerifyEmailStatus(input.Email);

    return { isSuccess: true };
  }

  async sendOTP(input: SendOTPInputDto): Promise<MessageOutput> {
    const otp = onGenerateOTP(6);
    await this.storeAndSendOTP(input.Email, otp);

    return { message: 'Check your mailbox' };
  }

  async myInfo(userId: string): Promise<User> {
    const user = await this.getById(userId);

    delete user.password;

    return user;
  }

  async login(input: LoginInputDto): Promise<User> {
    const user = await this.getByEmail(input.Email);
    if (!user) throw new NotFoundException('Invalid credentials specified');
    if (!user.emailVerified) throw new NotFoundException('Email not verified');

    const isMatched = onComparePassword(user.password, input.Password);
    if (!isMatched) throw new NotFoundException('Invalid credentials specified');

    return user;
  }

  async deleteUser(ID: string): Promise<SuccessOutput> {
    const deletedUser = await this.userRepository.delete({ ID });
    if (!deletedUser) {
      throw new NotFoundException('Invalid user specified!');
    }

    return { isSuccess: true };
  }

  async changeEmail(input: ChangeEmailInputDto, email: string): Promise<MessageOutput> {
    const userExist = await this.getByEmail(input.NewEmail);
    if (userExist) throw new NotFoundException('Email already registered');

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Invalid user specified!');
    }

    const isMatched = onComparePassword(user.password, input.Password);
    if (!isMatched) throw new UnauthorizedException('Invalid credentials specified');

    const otp = onGenerateOTP(6);
    await this.storeAndSendOTP(input.NewEmail, otp);

    await this.userRepository.update({ email }, { emailVerified: false, email: input.NewEmail });

    return { message: 'Check your mailbox' };
  }

  async changePassword(input: ChangePasswordInputDto, ID: string): Promise<SuccessOutput> {
    const user = await this.userRepository.findOne({ where: { ID } });
    if (!user) {
      throw new NotFoundException('Invalid user specified!');
    }

    const isMatched = onComparePassword(user.password, input.Password);
    if (!isMatched) throw new NotFoundException('Invalid credentials specified');

    await this.userRepository.update({ ID }, { password: onHashPassword(input.NewPassword) });

    return { isSuccess: true };
  }

  async updateUser(input: UpdateUserInputDto, ID: string): Promise<SuccessOutput> {
    const user = await this.getById(ID);
    if (!user) {
      throw new NotFoundException('Invalid user specified!');
    }

    await this.userRepository.update({ ID }, { fullname: input.Fullname });

    return { isSuccess: true };
  }

  async forgotPassword(input: ForgotPasswordInputDto): Promise<MessageOutput> {
    const user = await this.getByEmail(input.Email);
    if (!user) {
      throw new NotFoundException('Invalid user specified!');
    }

    const otp = onGenerateOTP(6);
    await this.storeAndSendOTP(input.Email, otp);

    return { message: 'Check your mailbox' };
  }

  async resetPassword(input: ResetPasswordInputDto): Promise<SuccessOutput> {
    await this.validateOTP(input.Email, input.OTP);

    await this.userRepository.update({ email: input.Email }, { password: onHashPassword(input.Password) });

    return { isSuccess: true };
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Invalid email specified');
    }

    return user;
  }

  async getById(ID: string): Promise<User> {
    const user = await this.userRepository.findById(ID);

    if (!user) {
      throw new NotFoundException('Invalid user specified');
    }

    return user;
  }

  async isUserExistById(ID: string): Promise<boolean> {
    const user = await this.getById(ID);
    return !!user;
  }

  async getUserById(ID: string): Promise<User> {
    const user = await this.getById(ID);

    if (!user) {
      throw new NotFoundException('Invalid user specified');
    }

    return user;
  }

  async updateVerifyEmailStatus(email: string): Promise<void> {
    const user = await this.userRepository.update({ email }, { emailVerified: true });

    if (!user) {
      throw new NotFoundException('Invalid user specified!');
    }
  }

  async validateOTP(email: string, otp: string) {
    const result = await this.redisService.getValueFromTempStore(email);

    if (result !== otp) {
      throw new BadRequestException('Invalid OTP for ' + email);
    }
  }
}
