/*
  Warnings:

  - You are about to drop the column `type` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `Word` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "type";

-- DropTable
DROP TABLE "Word";

-- DropEnum
DROP TYPE "QuestionType";

-- DropEnum
DROP TYPE "WordType";

-- CreateTable
CREATE TABLE "Spot" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentence" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "Spot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Spot" ADD CONSTRAINT "Spot_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
