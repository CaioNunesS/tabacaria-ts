/*
  Warnings:

  - You are about to drop the column `githubId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gitHubId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_githubId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "githubId",
ADD COLUMN     "gitHubId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_gitHubId_key" ON "User"("gitHubId");
