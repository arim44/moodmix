import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { };

  // auth 추가
  // 회원가입 시 사용 목적
  async createUser(data: { email: string, nickname: string, password: string, role: Role }) {
    return this.prisma.user.create({ data });
  }

  // 로그인 시 사용 목적
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  // 유저 등록
  async create(createUserDto: CreateUserDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email }
    });
    // 이메일이 존재하면
    if (exists) throw new ConflictException("이미 가입된 이메일 입니다");
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        role: Role.USER
      }
    });
  }

  // 전체 조회
  findAll() {
    return this.prisma.user.findMany({
      orderBy: { id: 'asc' }
    });
  }

 // 1명만 조회
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where : {id}
    });
    if(!user) throw new NotFoundException(`사용자 아이디 ${id} 찾을 수 없습니다`);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
