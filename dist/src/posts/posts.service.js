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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const constants_1 = require("../common/constants");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
let PostsService = class PostsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    ;
    async create(createPostDto, userId) {
        const post = await this.prisma.post.create({
            data: {
                user_id: userId,
                title: createPostDto.title,
                content: createPostDto.content
            }
        });
        return {
            id: post.id,
            title: post.title,
            message: "게시글이 등록되었습니다."
        };
    }
    async findAll() {
        const posts = await this.prisma.post.findMany({
            include: {
                user: {
                    select: {
                        nickname: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return posts.map((post) => ({
            id: post.id,
            title: post.title,
            imageUrl: post.image_url ? `${constants_1.BASE_URL}/uploads/${post.image_url}` : null,
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
            imageUrl: post.image_url ? `${constants_1.BASE_URL}/uploads/${post.image_url}` : null,
            author: {
                id: post.user.id,
                nickname: post.user.nickname,
            },
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    }
    async update(id, updatePostDto, userId) {
        await this.validateOwner(id, userId);
        await this.prisma.post.update({
            where: { id },
            data: {
                title: updatePostDto.title,
                content: updatePostDto.content
            }
        });
        return { message: "게시글이 수정되었습니다.", postId: id };
    }
    async remove(id, userId) {
        const post = await this.validateOwner(id, userId);
        if (post.image_url) {
            const filePath = path_1.default.join(process.cwd(), 'uploads', post.image_url);
            try {
                await fs_1.promises.unlink(filePath);
            }
            catch (error) {
                console.warn('이미지 삭제 실패', error);
            }
        }
        await this.prisma.post.delete({
            where: { id }
        });
        return { message: "게시글이 삭제되었습니다.", postId: id };
    }
    async addImage(postId, userId, file) {
        await this.validateOwner(postId, userId);
        const post = await this.prisma.post.update({
            where: { id: postId },
            data: {
                image_url: file.filename
            }
        });
        return {
            id: post.id,
            imageUrl: post.image_url ? `${constants_1.BASE_URL}/uploads/${post.image_url}` : null
        };
    }
    async validateOwner(postId, userId) {
        const post = await this.prisma.post.findUnique({
            where: { id: postId }
        });
        if (!post)
            throw new common_1.NotFoundException(`게시글 ${postId}를 찾을 수 없습니다.`);
        if (post.user_id !== userId)
            throw new common_1.ForbiddenException("본인 게시글만 접근할 수 있습니다.");
        return post;
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map