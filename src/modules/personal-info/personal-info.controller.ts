import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PersonalInfoService } from './personal-info.service';
import { CreatePersonalInfoDto } from './dto/create-personal-info.dto';
import { UpdatePersonalInfoDto } from './dto/update-personal-info.dto';
import { IPersonalInfoQuery } from './interfaces/personal-info-query.interface';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@Controller('personal-info')
@UseGuards(AuthGuard)
export class PersonalInfoController {
  constructor(private readonly personalInfoService: PersonalInfoService) {}

  @Post()
  @Permissions('permission-personal-info-create')
  async create(@Body() createPersonalInfoDto: CreatePersonalInfoDto) {
    return await this.personalInfoService.create(createPersonalInfoDto);
  }

  @Get()
  @Permissions('permission-personal-info-view')
  async findAll(@Query() query: IPersonalInfoQuery) {
    return await this.personalInfoService.findAll(query);
  }

  @Patch(':id')
  @Permissions('permission-personal-info-edit')
  async update(@Param('id') id: string, @Body() updatePersonalInfoDto: UpdatePersonalInfoDto) {
    return await this.personalInfoService.update(+id, updatePersonalInfoDto);
  }

  @Delete(':id')
  @Permissions('permission-personal-info-delete')
  async remove(@Param('id') id: string) {
    return await this.personalInfoService.remove(+id);
  }
}
