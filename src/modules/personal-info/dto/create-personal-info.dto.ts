import { IsEnum, IsNotEmpty } from "class-validator";

enum PersonalInfoTypes {
    SHORT_TEXT = "short_text",
    LONG_TEXT = "long_text",
    EMAIL = "email",
    PHONE = "phone",
    FILE_URL = "file_url",
    IMAGE_URL = "image_url",
    NUMBER = "number",
    DATE = "date",
    LINK = "link",
    JSON = "json",
}

export class CreatePersonalInfoDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    value: any;

    @IsNotEmpty()
    @IsEnum(PersonalInfoTypes)
    type: PersonalInfoTypes;
}
