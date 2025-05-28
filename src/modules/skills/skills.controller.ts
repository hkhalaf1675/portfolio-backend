import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('skills')
@UseGuards(AuthGuard)
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @Permissions('permission-skill-create')
  async create(@Body() createSkillDto: CreateSkillDto) {
    return await this.skillsService.create(createSkillDto);
  }

  @Get()
  @Public()
  async findAll() {
    return await this.skillsService.findAll();
  }

  @Patch(':id')
  @Permissions('permission-skill-edit')
  async update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return await this.skillsService.update(+id, updateSkillDto);
  }

  @Delete(':id')
  @Permissions('permission-skill-delete')
  async remove(@Param('id') id: string) {
    return await this.skillsService.remove(+id);
  }
}
