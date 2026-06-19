import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IngredientsService {
  constructor(private readonly prisma:PrismaService){};

  create(createIngredientDto: CreateIngredientDto) {
    return 'This action adds a new ingredient';
  }

  // 재료 전체 조회
  findAll() {
    return this.prisma.ingredient.findMany({
      orderBy:{id:'asc'}
    });
  }

  // 재료 하나만 상세조회
  async findOne(id: number) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: {id}
    });
    if(!ingredient) throw new NotFoundException(`재료 아이디 ${id} 찾을 수 없습니다`);
    return ingredient;
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return `This action updates a #${id} ingredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredient`;
  }
}
