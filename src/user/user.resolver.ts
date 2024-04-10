import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserRegisterInputDto, VerifyEmailInputDto, ChangePasswordInputDto, ChangeEmailInputDto, UpdateUserInputDto, LoginInputDto, ForgotPasswordInputDto, ResetPasswordInputDto, SendOTPInputDto } from './dto/UserInput.dto';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { MessageOutput, SuccessOutput } from 'src/common/dto/CommonOutput.dto';
import { TokenOutputDto } from './dto/UserOutput.dto';
import { CurrentUser } from 'src/decorator/CurrentUser.decorator';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Mutation(() => MessageOutput)
  async register(@Args('input') input: UserRegisterInputDto): Promise<MessageOutput> {
    return await this.userService.register(input);
  }

  @Mutation(() => SuccessOutput)
  async verifyEmail(@Args('input') input: VerifyEmailInputDto): Promise<SuccessOutput> {
    return this.userService.verifyEmail(input);
  }

  @Mutation(() => MessageOutput)
  async sendOTP(@Args('input') input: SendOTPInputDto): Promise<MessageOutput> {
    return this.userService.sendOTP(input);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  async me(@CurrentUser() currentUser: TokenUserType): Promise<User> {
    return this.userService.myInfo(currentUser.ID);
  }

  @Mutation(() => TokenOutputDto)
  async login(@Args('input') input: LoginInputDto): Promise<TokenOutputDto> {
    const user = await this.userService.login(input);
    const token = this.authService.signToken(user);
    return { token };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => SuccessOutput)
  async deleteUser(@CurrentUser() currentUser: TokenUserType): Promise<SuccessOutput> {
    return this.userService.deleteUser(currentUser.ID);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => SuccessOutput)
  async changePassword(@Args('input') input: ChangePasswordInputDto, @CurrentUser() currentUser: TokenUserType): Promise<SuccessOutput> {
    return this.userService.changePassword(input, currentUser.ID);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => MessageOutput)
  async changeEmail(@Args('input') input: ChangeEmailInputDto, @CurrentUser() currentUser: TokenUserType): Promise<MessageOutput> {
    return this.userService.changeEmail(input, currentUser.email);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => SuccessOutput)
  async updateUser(@Args('input') input: UpdateUserInputDto, @CurrentUser() currentUser: TokenUserType): Promise<SuccessOutput> {
    return this.userService.updateUser(input, currentUser.ID);
  }

  @Mutation(() => MessageOutput)
  async forgotPassword(@Args('input') input: ForgotPasswordInputDto): Promise<MessageOutput> {
    return this.userService.forgotPassword(input);
  }

  @Mutation(() => SuccessOutput)
  async resetPassword(@Args('input') input: ResetPasswordInputDto): Promise<SuccessOutput> {
    return this.userService.resetPassword(input);
  }
}
