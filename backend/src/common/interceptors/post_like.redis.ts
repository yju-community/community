// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
// } from '@nestjs/common';
// import { map, Observable } from 'rxjs';
// import { promisify } from 'util';
// import client from '../redis.client';
// @Injectable()
// export class UndefinedToNullInterceptor implements NestInterceptor {
//   intercept(
//     context: ExecutionContext,
//     next: CallHandler<any>,
//   ): Observable<any> | Promise<Observable<any>> {
//     const request = context.switchToHttp().getRequest();
//     console.log(request.baseUrl);
//     const id = request.params.id;
//     const user = request.user;
//     const getSismember = promisify(client.sismember).bind(client);
//     const isLiked = getSismember(`postlike:${id}`, user.userId);
//     client.SREM(`postlike:${id}`, user.userId);
//     return next.handle();
//   }
// }
