import { Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import RequestWithUser from 'src/users/dto/requestWithUser.interface';
import { JwtRefreshGuard } from './jwt/jwt-auth.refresh.guard';
import { User } from 'src/common/decorators/user.decorator';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/user.dto';

@ApiTags('AUTH')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: '토큰 발행 성공',
  })
  @ApiOperation({ summary: 'Access token 재발행' })
  @ApiCookieAuth()
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() req: RequestWithUser) {
    const accessToken = this.authService.getCookieWithJwtAccessToken(
      req.user.id,
    );
    req.res.setHeader('Authorization', `Bearer ${accessToken}`);
    return req.user;
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @ApiOperation({ summary: '로그인 후 접근 권한 실험' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  Authenticate(@User() user) {
    return user;
  }

  @ApiResponse({
    status: 200,
    description: '로그아웃 성공',
  })
  @ApiOperation({ summary: '로그아웃' })
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() req: RequestWithUser, @Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return res.json({ userid: req.user.id, logout: true });
  }
}
