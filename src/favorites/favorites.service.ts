import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) { };

  // 즐겨찾기 추가 createFavoriteDto: CreateFavoriteDto, 
  async create(userId: number, cocktailId: number) {
    // 존재하는 칵테일인지 체크
    const cocktail = await this.prisma.cocktail.findUnique({
      where: { id: cocktailId }
    });
    if (!cocktail) throw new NotFoundException(`칵테일 ${cocktailId}를 찾을 수 없습니다.`);

    // 이미 추가된 칵테일인지 체크
    const exists = await this.prisma.favorite.findUnique({
      where: {
        user_id_cocktail_id: {
          user_id: userId,
          cocktail_id: cocktailId
        }
      }
    });
    if (exists) throw new ConflictException("이미 즐겨찾기한 칵테일 입니다.");

    // 즐겨찾기 추가
    const favorite = await this.prisma.favorite.create({
      data: {
        user_id: userId,
        cocktail_id: cocktailId
      }
    });

    return { message: "즐겨찾기에 추가되었습니다.", favoriteId: favorite.id }
  }

  // 내 즐겨찾기 목록
  async findAll(userId: number) {
    const favorites = await this.prisma.favorite.findMany({
      where: { user_id: userId },
      include: { cocktail: true },
      orderBy: { createdAt: 'desc' }
    });

    return favorites.map((favorite) => ({
      favoriteId: favorite.id,
      cocktailId: favorite.cocktail_id,
      name: favorite.cocktail.name_en,
      imageUrl: favorite.cocktail.image_url,
      category: favorite.cocktail.category,
      alcoholic: favorite.cocktail.alcoholic,
      addedAt: favorite.createdAt
    }));
    // return this.prisma.favorite.findMany({
    //   where:{user_id: userId},
    //   include:{cocktail:true}
    // });
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }
  // 즐겨찾기 삭제
  async remove(userId: number, favoriteId: number) { //, cocktailId : number
    // 즐겨찾기에 있는건지 체크
    const favorite = await this.prisma.favorite.findUnique({
      where: { id: favoriteId }
    });
    if (!favorite) throw new NotFoundException("즐겨찾기를 찾을 수 없습니다.");
    if (favorite.user_id !== userId) {
      throw new NotFoundException("삭제 권한이 없습니다.");
    }

    // 즐겨찾기 삭제
    await this.prisma.favorite.delete({
      where: { id:favoriteId}
    });

    return { message: "즐겨찾기가 삭제되었습니다.", favoriteId };
  }
}
