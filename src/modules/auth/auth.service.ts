import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { FailResponseDto } from 'src/common/dtos/fail.response.dto';
import * as bcrypt from 'bcrypt';
import { SuccessResponseDto } from 'src/common/dtos/success.response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ){}

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({ 
      where: { email: loginDto.email },
      relations: {
        permissions: true
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        permissions: {
          id: true,
          name: true,
          token: true,
        }
      }
    });

    if(!user){
      throw new UnauthorizedException(new FailResponseDto(
        ['There was a problem logging in, Check your credentials and try again.'],
        'Validation Error',
        401
      ));
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if(!isMatch){
      throw new UnauthorizedException(new FailResponseDto(
        ['There was a problem logging in, Check your credentials and try again.'],
        'Validation Error',
        401
      ));
    }

    const token = await this.jwtService.signAsync({
      user: { sub: user.id, email: user.email }
    });

    delete user.password;
    return new SuccessResponseDto(
      'Login successful',
      { user, token },
      200
    );
  }
}
