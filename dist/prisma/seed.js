"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const cocktail = await prisma.cocktail.upsert({
        where: { id: 1 },
        create: {
            name_en: "aaa",
            name_ko: "홍길동",
            image_url: "/uploads/ingredients",
            category: "aaa",
            alcoholic: "aaa",
            glass: "dd",
            instruction_en: "제조법"
        },
        update: {},
    });
    console.log(`seed 완료: ${cocktail.name_en}`);
}
main()
    .catch((e) => {
    console.log(e);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map