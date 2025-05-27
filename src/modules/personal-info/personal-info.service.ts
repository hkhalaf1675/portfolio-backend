import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonalInfoDto } from './dto/create-personal-info.dto';
import { UpdatePersonalInfoDto } from './dto/update-personal-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalInfo } from './entities/personal-info.entity';
import { Repository } from 'typeorm';
import { SuccessResponseDto } from 'src/common/dtos/success.response.dto';
import { IPersonalInfoQuery } from './interfaces/personal-info-query.interface';
import { FailResponseDto } from 'src/common/dtos/fail.response.dto';

@Injectable()
export class PersonalInfoService {
  constructor(
    @InjectRepository(PersonalInfo)
    private readonly personalInfoRepository: Repository<PersonalInfo>
  ) {}
  
  async create(createPersonalInfoDto: CreatePersonalInfoDto) {
    const personalInfo = this.personalInfoRepository.create(createPersonalInfoDto);
    await this.personalInfoRepository.save(personalInfo);

    return new SuccessResponseDto(
      `${personalInfo.title} has been added successfully.`,
      { personalInfo },
      201
    );
  }

  async findAll(query: IPersonalInfoQuery) {
    let { page, perPage, title } = query;

    page = page ? page : 1;
    perPage = perPage ? perPage : 10;

    const personalInfoQuery = this.personalInfoRepository.createQueryBuilder('personalInfo');

    if(title) {
      personalInfoQuery.where('personalInfo.title LIKE :title', { title: `%${title}%` });
    }

    personalInfoQuery.orderBy('personalInfo.createdAt', 'DESC');
    personalInfoQuery.skip((page - 1) * perPage).take(perPage);

    const [personalInfo, total] = await personalInfoQuery.getManyAndCount();

    return new SuccessResponseDto(
      '',
      {
        pageInfo: {
          totalItems: total, 
          totalPages: Math.ceil(total / perPage),
          currentPage: page
        },
        personalInfo
      },
      200
    );
  }

  async update(id: number, updatePersonalInfoDto: UpdatePersonalInfoDto) {
    const personalInfo = await this.personalInfoRepository.findOneBy({ id });
    if(!personalInfo) {
      throw new NotFoundException(new FailResponseDto(
        ['There is no personal info with this id!'],
        'Validation Error',
        404
      ));
    }

    await this.personalInfoRepository.update(id, updatePersonalInfoDto);

    return new SuccessResponseDto(
      'Personal Info has been updated successfully.',
      null,
      200
    );
  }

  async remove(id: number) {
    const personalInfo = await this.personalInfoRepository.findOneBy({ id });
    if(!personalInfo) {
      throw new NotFoundException(new FailResponseDto(
        ['There is no personal info with this id!'],
        'Validation Error',
        404
      ));
    }

    await this.personalInfoRepository.remove(personalInfo);

    return new SuccessResponseDto(
      'Personal Info has been deleted successfully.',
      null,
      200
    );
  }
}
