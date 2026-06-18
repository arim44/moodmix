/*
  Warnings:

  - A unique constraint covering the columns `[external_id]` on the table `Cocktail` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Cocktail" ADD COLUMN     "external_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Cocktail_external_id_key" ON "Cocktail"("external_id");
