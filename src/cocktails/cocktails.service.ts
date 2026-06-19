import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { PrismaService } from '../prisma/prisma.service';

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
    return cocktail;
  }

  update(id: number, updateCocktailDto: UpdateCocktailDto) {
    return `This action updates a #${id} cocktail`;
  }

  remove(id: number) {
    return `This action removes a #${id} cocktail`;
  }
}
