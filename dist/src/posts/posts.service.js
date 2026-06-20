"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PostsService = class PostsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    ;
    async create(createPostDto, userId) {
        return this.prisma.post.create({
            data: {
                user_id: userId,
                title: createPostDto.title,
                content: createPostDto.content
            }
        });
    }
    async findAll() {
        const posts = await this.prisma.post.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        nickname: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return posts.map((post) => ({
            id: post.id,
            title: post.title,
            imageUrl: post.image_url,
            author: post.user.nickname,
            createdAt: post.createdAt,
        }));
    }
    async findOne(id) {
        const post = await this.prisma.post.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true, nickname: true
                    }
                }
            }
        });
        if (!post)
            throw new common_1.NotFoundException(`게시글 ${id}를 찾을 수 없습니다.`);
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            imageUrl: post.image_url,
            author: {
                id: post.user.id,
                nickname: post.user.nickname,
            },
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    }
    update(id, updatePostDto) {
        return `This action updates a #${id} post`;
    }
    remove(id) {
        return `This action removes a #${id} post`;
    }
    async addImage(postId, user, file) {
        return this.prisma.post.update({
            where: { id: postId },
            data: {
                image_url: file.filename
            }
        });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map