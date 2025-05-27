import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SuccessResponseDto } from 'src/common/dtos/success.response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(query: any) {
    return await this.findUsers({
      page: query.page, perPage: query.perPage, 
      name: query.name, email: query.email
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        permissions: true
      }
    });

    return new SuccessResponseDto(
      '',
      { user },
      200
    );
  }

  private async findUsers(query: any) {
    let { page, perPage, name, email } = query;

    page = page ? +page : 1;
    perPage = perPage ? +perPage : 10;

    const userQuery = this.userRepository.createQueryBuilder('user');

    if(name){
      userQuery.andWhere('user.name LIKE :name', { name: `%${name}%` });
    }
    if(email){
      userQuery.andWhere('user.email LIKE :email', { email: `%${email}%`});
    }
    
    userQuery.skip((page - 1) * perPage).take(perPage);
    userQuery.orderBy('user.createdAt', 'DESC');

    const [users, total] = await userQuery.getManyAndCount();

    return new SuccessResponseDto(
      '',
      {
        pageInfo: {
          totalItems: total,
          totalPages: Math.ceil(total / perPage),
          currentPage: page
        },
        users
      },
      200
    );
  }
}
