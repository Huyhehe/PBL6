/*
  Warnings:

  - Made the column `userId` on table `StudySet` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "StudySet" DROP CONSTRAINT "StudySet_userId_fkey";

-- AlterTable
ALTER TABLE "StudySet" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "StudySet" ADD CONSTRAINT "StudySet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
