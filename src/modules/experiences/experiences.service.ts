import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { Repository } from 'typeorm';
import { SuccessResponseDto } from 'src/common/dtos/success.response.dto';
import { FailResponseDto } from 'src/common/dtos/fail.response.dto';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>
  ) {}

  async create(createExperienceDto: CreateExperienceDto) {
    const experience = this.experienceRepository.create(createExperienceDto);

    await this.experienceRepository.save(experience);

    return new SuccessResponseDto(
      'Experince has been added succfully',
      { experience },
      201
    );
  }

  async findAll() {
    const experiences = await this.experienceRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return new SuccessResponseDto(
      '',
      { experiences },
      200
    );
  }

  async update(id: number, updateExperienceDto: UpdateExperienceDto) {
    const experience = await this.experienceRepository.findOneBy({ id });
    if (!experience) {
      throw new NotFoundException(new FailResponseDto(
        ['There is no experience with this id'],
        'Validation Error',
        404
      ));
    }

    await this.experienceRepository.update(id, updateExperienceDto);

    return new SuccessResponseDto(
      'Experience has been updated successfully',
      null,
      200
    );
  }

  async remove(id: number) {
    const experience = await this.experienceRepository.findOneBy({ id });
    if (!experience) {
      throw new NotFoundException(new FailResponseDto(
        ['There is no experience with this id'],
        'Validation Error',
        404
      ));
    }

    await this.experienceRepository.remove(experience);

    return new SuccessResponseDto(
      'Experience has been deleted successfully',
      null,
      200
    );
  }
}
