import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CertificationsService } from './certifications.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@Controller('certifications')
@UseGuards(AuthGuard)
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @Post()
  @Permissions('permission-certification-create')
  async create(@Body() createCertificationDto: CreateCertificationDto) {
    return await this.certificationsService.create(createCertificationDto);
  }

  @Get()
  @Permissions('permission-certification-view')
  async findAll() {
    return await this.certificationsService.findAll();
  }

  @Patch(':id')
  @Permissions('permission-certification-edit')
  async update(@Param('id') id: string, @Body() updateCertificationDto: UpdateCertificationDto) {
    return await this.certificationsService.update(+id, updateCertificationDto);
  }

  @Delete(':id')
  @Permissions('permission-certification-delete')
  async remove(@Param('id') id: string) {
    return await this.certificationsService.remove(+id);
  }
}
