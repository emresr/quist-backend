/*
  Warnings:

  - You are about to drop the column `definiton` on the `Word` table. All the data in the column will be lost.
  - Added the required column `definition` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "WordType" ADD VALUE 'VERB';

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "definiton",
ADD COLUMN     "definition" TEXT NOT NULL;
