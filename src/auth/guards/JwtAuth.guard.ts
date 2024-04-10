import { BadRequestException, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const ctx = gqlContext.getContext();

    const authHeader = ctx.req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new BadRequestException('Invalid authorization specified');
    }

    const token = authHeader.split(' ')[1];

    const tokenUser: TokenUserType = this.authService.decodeToken(token);
    if (!tokenUser) {
      throw new UnauthorizedException('Invalid authorization specified');
    }

    await this.authService.authenticateUser(tokenUser.ID, tokenUser.email);

    return true;
  }
}
