import { ApiProperty } from "@nestjs/swagger";
import { IsInt, MinLength } from "class-validator";

export class CreateCocktailDto {
    @ApiProperty({example:1101})
    @IsInt()
    @MinLength(1)
    external_id: number;
}