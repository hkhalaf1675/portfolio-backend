import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('experiences')
@UseGuards(AuthGuard)
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post()
  @Permissions('permission-experience-create')
  async create(@Body() createExperienceDto: CreateExperienceDto) {
    return await this.experiencesService.create(createExperienceDto);
  }

  @Get()
  @Public()
  async findAll() {
    return await this.experiencesService.findAll();
  }

  @Patch(':id')
  @Permissions('permission-experience-edit')
  async update(@Param('id') id: string, @Body() updateExperienceDto: UpdateExperienceDto) {
    return await this.experiencesService.update(+id, updateExperienceDto);
  }

  @Delete(':id')
  @Permissions('permission-experience-delete')
  async remove(@Param('id') id: string) {
    return await this.experiencesService.remove(+id);
  }
}
