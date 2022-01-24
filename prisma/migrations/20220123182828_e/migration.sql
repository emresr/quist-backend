-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('WORD', 'SENTENCE');

-- CreateEnum
CREATE TYPE "WordType" AS ENUM ('ADVERB', 'ADJECTIVE', 'NOUN');

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "type" "QuestionType";

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "definiton" TEXT NOT NULL,
    "type" "WordType" NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);
