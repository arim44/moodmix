import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt } from "class-validator";

export class RecommendCocktailDto {
    @ApiProperty({example: [1,2,10]})
    @IsArray()
    @IsInt({each:true})
    @Type(()=> Number)
    ingredientIds : number[];
}