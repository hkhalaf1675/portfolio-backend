import { Controller, Get, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@Controller('permissions')
@UseGuards(AuthGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @Permissions('permission-permission-view')
  async findAll() {
    return await this.permissionsService.findAll();
  }

}
