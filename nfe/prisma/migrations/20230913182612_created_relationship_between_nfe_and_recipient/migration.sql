/*
  Warnings:

  - Added the required column `recipientId` to the `nfes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "nfes" ADD COLUMN     "recipientId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "nfes" ADD CONSTRAINT "nfes_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "recipients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
