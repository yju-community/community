import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/user.dto';
import RequestWithUser from 'src/users/dto/requestWithUser.interface';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { GoogleOauthGuard } from './google-oauth.guard';

@ApiTags('GOOGLE')
@Controller('api/auth/google')
export class GoogleOauthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {}

  @ApiResponse({
    status: 200,
    description: '구글 로그인 성공',
    type: UserDto,
  })
  @ApiOperation({ summary: '구글 로그인 후 리다이렉트' })
  @UseGuards(GoogleOauthGuard)
  @Redirect('http://localhost:3060/login/refresh')
  @Get('redirect')
  async googleAuthRedirect(@Req() req: RequestWithUser) {
    const refreshTokenCookie = this.jwtAuthService.getCookieWithJwtRefreshToken(
      req.user.id,
    );
    req.res.setHeader('Set-Cookie', refreshTokenCookie);
    return req.user;
  }
}
