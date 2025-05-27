import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class CreateCertificationDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    url?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    date?: Date;
}
