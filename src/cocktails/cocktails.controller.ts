import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { CocktailsService } from './cocktails.service';
import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { ApiOperation } from '@nestjs/swagger';
import { RecommendCocktailDto } from './recommend/dto/recommendCocktail.dto';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) { }

  @Post()
  @ApiOperation({ summary: "칵테일 등록" })
  create(@Body() createCocktailDto: CreateCocktailDto) {
    return this.cocktailsService.create(createCocktailDto);
  }

  @Get()
  @ApiOperation({ summary: "칵테일 전체조회" })
  findAll() {
    return this.cocktailsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "칵테일 1개 상세조회" })
  findOne(@Param('id') id: string) {
    return this.cocktailsService.findOne(+id);
  }

  @Post("recommend")
  @HttpCode(200)
  @ApiOperation({ summary: "재료 선택 추천" })
  recommend(@Body() dto: RecommendCocktailDto) {
    return this.cocktailsService.recommend(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCocktailDto: UpdateCocktailDto) {
    return this.cocktailsService.update(+id, updateCocktailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cocktailsService.remove(+id);
  }
}
