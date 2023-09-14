/*
  Warnings:

  - Added the required column `integrationId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `integrationId` to the `recipients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "integrationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "recipients" ADD COLUMN     "integrationId" TEXT NOT NULL;
