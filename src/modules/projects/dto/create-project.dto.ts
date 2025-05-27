import { IsArray, IsNotEmpty, IsOptional } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    description?: string;

    @IsNotEmpty()
    url: string;

    @IsOptional()
    @IsArray()
    skills?: number[];
}
