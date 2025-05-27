import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { SuccessResponseDto } from 'src/common/dtos/success.response.dto';
import { groupBy } from 'lodash';
import { FailResponseDto } from 'src/common/dtos/fail.response.dto';

@Injectable()
export class SkillsService {
  constructor(
      @InjectRepository(Skill)
      private readonly skillRepository: Repository<Skill>
  ) {}

  async create(createSkillDto: CreateSkillDto) {
    const skill = this.skillRepository.create(createSkillDto);

    await this.skillRepository.save(skill);

    return new SuccessResponseDto(
      'Skill has been added successfully',
      { skill },
      201
    );
  }

  async findAll() {
    const skills = await this.skillRepository.find({
      order: {
        category: 'ASC'
      }
    });
    
    const grouped = groupBy(skills, 'category');
    return new SuccessResponseDto(
      '',
      {
        skills: grouped
      },
      200
    );
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    const skill = await this.skillRepository.findOneBy({ id });
    if (!skill) {
      throw new NotFoundException(new FailResponseDto(
        ['There is no skill with this id'],
        'Validation Error',
        404
      ));
    }

    await this.skillRepository.update(id, updateSkillDto);

    return new SuccessResponseDto(
      'Skill has been updated successfully',
      null,
      200
    );
  }

  async remove(id: number) {
    const skill = await this.skillRepository.findOneBy({ id });
    if (!skill) {
      throw new NotFoundException(new FailResponseDto(
        ['There is no skill with this id'],
        'Validation Error',
        404
      ));
    }

    await this.skillRepository.remove(skill);

    return new SuccessResponseDto(
      'Skill has been delted successfully',
      null,
      200
    );
  }
}
