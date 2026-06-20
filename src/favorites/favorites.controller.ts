import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { type AuthUser, CurrentUser } from '../common/current-user.decorator';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary:"즐겨찾기 추가"})
  create(@Body() createFavoriteDto: CreateFavoriteDto,
          @CurrentUser() user: AuthUser  ) {
    return this.favoritesService.create(
      user.id, createFavoriteDto.cocktailId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary:"내 즐겨찾기 목록"})
  findAll(@CurrentUser() user: AuthUser) {
    return this.favoritesService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoriteDto: UpdateFavoriteDto) {
    return this.favoritesService.update(+id, updateFavoriteDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary:"즐겨찾기 삭제"})
  remove(@Param('id') cocktailId: string,
          @CurrentUser() user: AuthUser) {
    return this.favoritesService.remove(user.id, +cocktailId);
  }
}
