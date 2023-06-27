import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      // NOTE: Deve assumir-se que o acesso à Api é feito por um
      // utilizador já autenticado e autorizado,
      // estando o seu userId já presente no pedido á Api.

      return true;
      // NOTE: aqui deveria retornar false
    }
    return true;
  }
}
