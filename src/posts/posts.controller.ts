import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ParseIntPipe, UploadedFile, UnsupportedMediaTypeException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { type AuthUser, CurrentUser } from '../common/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions } from '../common/upload.config';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "게시글 등록" })
  create(@Body() createPostDto: CreatePostDto,
    @CurrentUser() user: AuthUser) {
    return this.postsService.create(createPostDto, user.id);
  }

  // 첨부파일
  @Post(":id/images")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: { image: { type: "string", format: "binary" } }
    }
  })
  @UseInterceptors(FileInterceptor("image", imageUploadOptions))
  @ApiOperation({ summary: "이미지 올리기" })
  addImage(
    @Param("id", ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: AuthUser
  ) {
    if (!file) throw new UnsupportedMediaTypeException("올릴 이미지가 업어요");
    // console.log(file)
    return this.postsService.addImage(id, user.id, file);
  }


  @Get()
  @ApiOperation({ summary: "게시글 목록 조회" })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "게시글 상세조회" })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "게시글 수정" })
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto,
          @CurrentUser() user: AuthUser) {
    return this.postsService.update(id, updatePostDto, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "게시글 삭제" })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthUser) {
    return this.postsService.remove(id, user.id);
  }
}
