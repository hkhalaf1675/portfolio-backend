import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { Skill } from '../skills/entities/skill.entity';
import { FailResponseDto } from 'src/common/dtos/fail.response.dto';
import { SuccessResponseDto } from 'src/common/dtos/success.response.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    let skills: Skill[] = [];
    if (createProjectDto.skills && createProjectDto.skills.length > 0) {
      for (const skillId of createProjectDto.skills) {
        const skill = await this.skillRepository.findOneBy({ id: skillId });
        if (skill) {
          skills.push(skill);
        }
        else{
          throw new NotFoundException(new FailResponseDto(
            [`Skill with ID ${skillId} not found`],
            'Validation Error',
            404
          ));
        }
      }
    }

    const project = this.projectRepository.create({
      ...createProjectDto,
      skills,
    });

    await this.projectRepository.save(project);

    return new SuccessResponseDto(
      'Project has been added successfully',
      { project },
      201
    );
  }

  async findAll() {
    const projects = await this.projectRepository.find({
      relations: ['skills'],
      select: {
        id: true,
        title: true,
        description: true,
        url: true,
        createdAt: true,
        skills: {
          id: true,
          title: true,
          category: true,
        },
      }
    });

    return new SuccessResponseDto(
      'Projects retrieved successfully',
      { projects },
      200
    );
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException(new FailResponseDto(
        [`Project with ID ${id} not found`],
        'Not Found',
        404
      ));
    }

    let skills: Skill[] = [];
    if (updateProjectDto.skills && updateProjectDto.skills.length > 0) {
      for (const skillId of updateProjectDto.skills) {
        const skill = await this.skillRepository.findOneBy({ id: skillId });
        if (skill) {
          skills.push(skill);
        } else {
          throw new NotFoundException(new FailResponseDto(
            [`Skill with ID ${skillId} not found`],
            'Validation Error',
            404
          ));
        }
      }
    }

    this.projectRepository.merge(project, {
      ...updateProjectDto,
      skills: skills.length > 0 ? skills : project.skills,
    });

    await this.projectRepository.save(project);

    return new SuccessResponseDto(
      'Project has been updated successfully',
      null,
      200
    );
  }

  async remove(id: number) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException(new FailResponseDto(
        [`Project with ID ${id} not found`],
        'Not Found',
        404
      ));
    }

    await this.projectRepository.delete(id);

    return new SuccessResponseDto(
      'Project has been deleted successfully',
      null,
      200
    );
  }
}
