import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { SuccessResponseDto } from 'src/common/dtos/success.response.dto';
import { groupBy } from "lodash";

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {}

  async findAll() {
    let permissions = await this.permissionRepository.find({
      order: {
        category: 'ASC'
      }
    });

    const grouped = groupBy(permissions, 'category');
    return new SuccessResponseDto(
      '',
      {
        permissions: grouped
      },
      200
    );
  }
}
