import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Permissions('permission-user-view')
  async findAll(@Query() query: any) {
    return await this.usersService.findAll(query);
  }

  @Get(':id')
  @Permissions('permission-user-view')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }
}
