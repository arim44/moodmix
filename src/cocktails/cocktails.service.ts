import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
  async findAll() {
    const cocktails = await this.prisma.cocktail.findMany({
      orderBy: { name_en: 'asc' }
    });

    return cocktails.map((data) => ({
      id: data.id,
      name: data.name_en,
      image: data.image_url,
      category: data.category,
      alcoholic: data.alcoholic
    }));
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

  // 칵테일 이름 검색
  async search(keyword: string) {
    // 빈검색어 예외
    if (!keyword?.trim()) throw new BadRequestException('검색어를 입력해주세요.');
    const cocktails = await this.prisma.cocktail.findMany({
      where: {
        name_en: {
          contains: keyword,
          mode: 'insensitive'
        }
      },
      orderBy: { name_en: 'asc' }
    });
    // 검색 결과 없을때
    if (cocktails.length === 0) throw new NotFoundException(`"${keyword}" 검색 결과가 없습니다.`);

    return cocktails.map((cocktail) => ({
      id: cocktail.id,
      name: cocktail.name_en,
      image: cocktail.image_url,
      alcoholic: cocktail.alcoholic,
      category: cocktail.category
    }));
  }

  // 재료기반 추천
  // 정렬 기준: 일치 재료 개수 우선 정렬
  async recommend(dto: RecommendCocktailDto) {
    const cocktails = await this.prisma.cocktail.findMany({
      include: {
        ingredients: true,
      }
    });

    // 존재하지 않는 재료일경우
    const count = await this.prisma.ingredient.count({
      where: { id: { in: dto.ingredientIds } }
    });
    if (count !== dto.ingredientIds.length) throw new NotFoundException("존재하지 않는 재료입니다.");

    const result = cocktails.map((cocktail) => {
      const matchedCount = cocktail.ingredients.filter((item) =>
        dto.ingredientIds.includes(item.ingredient_id)).length;

      const totalCount = cocktail.ingredients.length;

      // 재료없는 칵테일 방어 totalCount>0
      // 현재 일치재료/칵테일 총재료 * 백분율(퍼센트)
      const matchRate = totalCount > 0 ? Math.round((matchedCount / totalCount) * 100) : 0;

      return {
        id: cocktail.id,
        name: cocktail.name_en,
        image: cocktail.image_url,
        // 일치하는 재료 수
        matchCount: matchedCount,
        // 총 재료 수
        totalCount,
        // 일치율
        matchRate,
      };
    }).filter((data) => data.matchRate > 30)
      //.sort((a, b) => b.matchRate - a.matchRate)
      .sort((a, b) => {
        if (b.matchCount !== a.matchCount) {
          return b.matchCount - a.matchCount;  // 1. 매치수 내림차순
        }
        return b.matchRate - a.matchRate; //2. 매치율 내림차순
      })
      .slice(0, 5);  //상위 5개만 표시

    // 추천 결과 없을때
    if (result.length === 0) throw new NotFoundException(
      "선택한 재료로 만들 수 있는 칵테일이 없습니다.");
    return result;
  }
}
