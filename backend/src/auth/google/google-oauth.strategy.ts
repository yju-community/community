import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JoinRequestDto } from 'src/users/dto/join.request.dto';
import passport from 'passport';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private usersService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      scope: ['email', 'profile'],
    });
  }
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback,
  ) {
    const { id, emails, _json } = profile;

    //hd는 @뒤에 구분자 gsuit 계정
    if (_json.hd !== process.env.YJU_HD) {
      throw new BadRequestException('우리 학교 학생이 아닙니다');
    }
    const email = emails[0].value;
    const joinRequestUser: JoinRequestDto = { id, email };
    const user = await this.usersService.findOrCreate(joinRequestUser);
    if (user) {
      done(null, user);
    }
  }
}
export interface GoogleProfile extends passport.Profile {
  _json: {
    hd: string;
  };
}
