import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Role } from "@prisma/client";

export interface AuthUser{
    id: number;
    email: string;
    role: Role;
}

// 현재 유저 데코레이터 만들기
export const CurrentUser = createParamDecorator((
    field : keyof AuthUser,
    ctx : ExecutionContext
) => {
    const request =ctx.switchToHttp().getRequest();
    const user: AuthUser = request.user;
    return field? user?.[field]: user;
})