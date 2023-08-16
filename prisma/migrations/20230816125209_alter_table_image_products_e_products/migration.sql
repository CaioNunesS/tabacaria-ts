/*
  Warnings:

  - The primary key for the `ImageProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[ImageName]` on the table `ImageProducts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ImageProducts" DROP CONSTRAINT "ImageProducts_pkey",
ADD CONSTRAINT "ImageProducts_pkey" PRIMARY KEY ("ImageName");

-- CreateIndex
CREATE UNIQUE INDEX "ImageProducts_ImageName_key" ON "ImageProducts"("ImageName");
