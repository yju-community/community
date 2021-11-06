import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class isLoggedInGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (
      (request?.cookies?.Authentication && request?.cookies?.Refresh) ||
      request?.cookies?.Refresh
    ) {
      return true;
    }
    throw new UnauthorizedException('로그인하지 않은 사용자입니다.');
  }
}
