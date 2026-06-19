import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RecommendCocktailDto } from './recommend/dto/recommendCocktail.dto';

@Injectable()
export class CocktailsService {
  // 생성자
  constructor(private readonly prisma: PrismaService) { };

  // 칵테일 등록
  create(createCocktailDto: CreateCocktailDto) {
    return 'This action adds a new cocktail';
  }

  // 칵테일 전체 조회
  findAll() {
    return this.prisma.cocktail.findMany({
      orderBy: { id: 'asc' }
    });
  }

  // 칵테일 1개만 상세조회
  async findOne(id: number) {
    const cocktail = await this.prisma.cocktail.findUnique({
      where: { id },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          }
        }
      }
    });
    if (!cocktail) throw new NotFoundException(`칵테일 아이디 ${id} 찾을 수 없습니다`);
    //return cocktail;
    return {
      id: cocktail.id,
      name: cocktail.name_en,
      image: cocktail.image_url,
      category: cocktail.category,
      alcoholic: cocktail.alcoholic,
      glass: cocktail.glass,
      instruction: cocktail.instruction_en,
      ingredients: cocktail.ingredients.map(item => ({
        name: item.ingredient.name_en,
        measure: item.measure
      }))
    };
  }

  update(id: number, updateCocktailDto: UpdateCocktailDto) {
    return `This action updates a #${id} cocktail`;
  }

  remove(id: number) {
    return `This action removes a #${id} cocktail`;
  }

  async recommend(dto: RecommendCocktailDto) {
    const cocktails = await this.prisma.cocktail.findMany({
      include: {
        ingredients: true,
      }
    });

    const result = cocktails.map((cocktail) => {
      const mathedCount = cocktail.ingredients.filter((item) =>
        dto.ingredientIds.includes(item.ingredient_id)).length;

      const totalCount = cocktail.ingredients.length;

      const matchRate = Math.round((mathedCount / totalCount) * 100);

      return {
        id: cocktail.id,
        name: cocktail.name_en,
        image: cocktail.image_url,
        // 보유 재료 표시
        matchCount: mathedCount,
        // 총 재룡 수
        totalCount,
        // 일치율
        matchRate,
      };
    }).filter((data) => data.matchRate > 30)
      .sort((a, b) => b.matchRate - a.matchRate)
      .slice(0,5);  //상위 5개만 표시

      return result;
  }
}
