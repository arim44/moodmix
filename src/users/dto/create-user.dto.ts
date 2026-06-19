import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example: "user@demo.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "회원이름" })
    @IsString()
    @MinLength(2)
    nickname: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    password: string;

    //role: Role;
}