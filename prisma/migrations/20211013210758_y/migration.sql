/*
  Warnings:

  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `correctAnswer` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "answers" TEXT[],
ADD COLUMN     "correctAnswer" TEXT NOT NULL,
ALTER COLUMN "isPublic" SET DEFAULT true;

-- DropTable
DROP TABLE "Answer";
