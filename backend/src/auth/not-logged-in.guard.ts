import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class isNotLoggedInGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (
      (request?.cookies?.Authentication && request?.cookies?.Refresh) ||
      request?.cookies?.Refresh
    ) {
      throw new UnauthorizedException('이미 로그인한 사용자입니다.');
    }
    return true;
  }
}
