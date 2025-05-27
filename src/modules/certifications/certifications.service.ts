import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Certification } from './entities/certification.entity';
import { Repository } from 'typeorm';
import { SuccessResponseDto } from 'src/common/dtos/success.response.dto';
import { FailResponseDto } from 'src/common/dtos/fail.response.dto';

@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(Certification)
    private readonly certificationRepository: Repository<Certification>
  ) {}

  async create(createCertificationDto: CreateCertificationDto) {
    const certification = this.certificationRepository.create(createCertificationDto);

    await this.certificationRepository.save(certification);

    return new SuccessResponseDto(
      'Certification has been created successfully',
      { certification },
      201
    );
  }

  async findAll() {
    const certifications = await this.certificationRepository.find();

    return new SuccessResponseDto(
      'Certifications retrieved successfully',
      { certifications },
      200
    );
  }

  async update(id: number, updateCertificationDto: UpdateCertificationDto) {
    const certification = await this.certificationRepository.findOneBy({ id });

    if (!certification) {
      throw new NotFoundException(new FailResponseDto(
        ['There is no certification with this ID'],
        'Validation Error',
        404
      ));
    }

    await this.certificationRepository.update(id, updateCertificationDto);

    return new SuccessResponseDto(
      'Certification has been updated successfully',
      null,
      200
    );
  }

  async remove(id: number) {
    const certification = await this.certificationRepository.findOneBy({ id });

    if (!certification) {
      throw new NotFoundException(new FailResponseDto(
        ['There is no certification with this ID'],
        'Validation Error',
        404
      ));
    }

    await this.certificationRepository.delete(id);

    return new SuccessResponseDto(
      'Certification has been deleted successfully',
      null,
      200
    );
  }
}
