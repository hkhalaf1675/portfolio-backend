import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { FailResponseDto } from '../dtos/fail.response.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import dataSource from 'src/database/data-source';
import { User } from 'src/modules/users/entities/user.entity';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector
  ) {}
  async canActivate(
    context: ExecutionContext,
  ) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if(isPublic){
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if(!token){
      throw new UnauthorizedException(new FailResponseDto(
        ['A token is required for authentication'],
        'Unauthorized User',
        401
      ));
    }

    let userId;

    try {
      const { user } = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('jwt.secret')
      });

      if(!user){
        throw new UnauthorizedException(new FailResponseDto(
          ['Invalid token'],
          'Unauthorized User',
          401
        ));
      }

      userId = user.sub;

    } catch (error) {
      throw new UnauthorizedException(new FailResponseDto(
        ['Invalid token'],
        'Unauthorized User',
        401
      ));
    }

    const myDataSource = dataSource;
    if(!myDataSource.isInitialized){
      await myDataSource.initialize();
    }

    const foundUser = await myDataSource.manager.findOne(User, {
      where: { id: userId },
      relations: {
        permissions: true
      }
    });
    if(!foundUser){
      throw new UnauthorizedException(new FailResponseDto(
        ['Invalid token'],
        'Unauthorized User',
        401
      ));
    }

    request['user'] = foundUser;

    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if(!requiredPermissions){
      return true;
    }

    for (const permissionsToken of requiredPermissions) {
      if(foundUser.permissions.some(permission => permission.token === permissionsToken)){
        return true;
      }
    }

    throw new ForbiddenException(new FailResponseDto(
      ['You are not authorized to access this resource'],
      'Unauthorized User',
      403
    ));
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }
}
