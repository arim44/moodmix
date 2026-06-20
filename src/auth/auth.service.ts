import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  // 생성자
  constructor(private readonly userService: UsersService,   //회원가입 및 찾기 this.prisma.user
              private readonly jwtService: JwtService){}    // Auth Module

  // 회원가입
  async register(dto: RegisterDto) {
    // 이메일 중복확인
    const exists = await this.userService.findByEmail(dto.email);
    if(exists) throw new ConflictException("이미 가입된 이메일 입니다.");

    // 평문 비밀번호를 암호화
     const hashed = await bcrypt.hash(dto.password, 10); // 비밀번호 암호화

     // 유저 생성
    const user = await this.userService.createUser({
      email: dto.email,
      nickname: dto.name,
      password: hashed,
      role: Role.USER,
    })

    // 비밀번호 빼고, 나머지 데이터 반환
    const {password, ...result} = user;
    return result;
  }

  // 로그인
    async login(dto: LoginDto) {
        // 1) 이메일로 회원이 있는지 검사
        const user = await this.userService.findByEmail(dto.email);

        // 2) 회원이 있으면 평문 암호와 DB에 저장된 해시를 비교 bcrpt.compare
        if(!user) throw new UnauthorizedException("비밀번호 암호가 틀립니다");
        // 패스워드랑 해시로된 패스워드 비교
        const isRight = await bcrypt.compare(dto.password, user!.password);

        // !user -> 유저가 없으면 true -> throw new Excepetion 유저가 있으면 컴페어 비교
        //if(!user || !(await bcrypt.compare(dto.password, user.password))){
        if(!user || !isRight){
            throw new UnauthorizedException("이메일 또는 비밀번호가 틀립니다.")
        }
        
        const payload = {
            sub: user.id, email: user.email, role: user.role
        }

        return{
            access_token : this.jwtService.sign(payload)
        }
    }

  // create(createPostDto: CreateAuthDto) {
  //     return 'This action adds a new post';
  //   }
  
  //   findAll() {
  //     return `This action returns all posts`;
  //   }
  
  //   findOne(id: number) {
  //     return `This action returns a #${id} post`;
  //   }
  
  //   update(id: number, updatePostDto: UpdateAuthDto) {
  //     return `This action updates a #${id} post`;
  //   }
  
  //   remove(id: number) {
  //     return `This action removes a #${id} post`;
  //   }
}
