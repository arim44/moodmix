// 회원 가입할때 쓰는 dto

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, IsString, MinLength, minLength } from "class-validator";

// POST /auth/register 
export class RegisterDto {
    @ApiProperty({ example: "user1@demo.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "pwd1234" })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({example: "회원"})
    @IsString()
    @MinLength(2)
    name: string;
}