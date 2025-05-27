import { IsNotEmpty, IsOptional, Max, Min } from "class-validator";

export class CreateSkillDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    category?: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    @Min(1)
    @Max(5)
    proficiencyLevel?: number;
}
