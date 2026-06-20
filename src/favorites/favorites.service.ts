import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma : PrismaService){};

  // 즐겨찾기 추가 createFavoriteDto: CreateFavoriteDto, 
  async create(userId:number, cocktailId: number) {
    const exists = await this.prisma.favorite.findUnique({
      where:{
        user_id_cocktail_id: {
          user_id: userId,
          cocktail_id: cocktailId
        }
      }
    });
    if(exists) throw new ConflictException("이미 즐겨찾기한 칵테일 입니다.");

    return this.prisma.favorite.create({
      data: {
        user_id: userId,
        cocktail_id: cocktailId
      }
    });
  }

  // 내 즐겨찾기 목록
  findAll(userId: number) {
    return this.prisma.favorite.findMany({
      where:{user_id: userId},
      include:{cocktail:true}
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }
  // 즐겨찾기 삭제
  remove(userId: number, cocktailId : number) {
    return this.prisma.favorite.delete({
      where:{
        user_id_cocktail_id: {
          user_id: userId,
          cocktail_id: cocktailId,
        }
      }
    });
  }
}
