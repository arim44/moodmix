import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreatePostDto {
    @ApiProperty({example: "오늘 만든 모히또"})
    @IsString()
    @MinLength(2)
    title:string;

    @ApiProperty({example: "모양은 합격 맛은 쏘쏘~"})
    @IsString()
    @MinLength(2)
    content: string;

}