import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt } from "class-validator";

export class RecommendCocktailDto {
    @ApiProperty({example: [1,2,10]})
    @IsArray()
    @ArrayMinSize(1)
    @IsInt({each:true})
    @Type(()=> Number)
    ingredientIds : number[];
}