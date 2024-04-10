import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async authenticateUser(ID: string, email: string): Promise<void> {
    try {
      const userExist = await this.userService.getById(ID);

      if (!userExist || userExist.email !== email) {
        throw new UnauthorizedException('Invalid authorization specified');
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  signToken(user: User): string {
    const tokenUser: TokenUserType = {
      email: user.email,
      ID: user.ID,
    };
    const token = this.jwtService.sign(tokenUser);
    return token;
  }

  decodeToken(token: string): TokenUserType {
    const tokenUser = this.jwtService.decode(token);
    return tokenUser as TokenUserType;
  }
}
