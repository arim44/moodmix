/*
  Warnings:

  - A unique constraint covering the columns `[name_en]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Cocktail" ADD COLUMN     "instruction_ko" TEXT,
ALTER COLUMN "name_ko" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "name_ko" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_en_key" ON "Ingredient"("name_en");
