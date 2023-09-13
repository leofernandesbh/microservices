/*
  Warnings:

  - You are about to drop the column `code` on the `nfe_items` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `nfe_items` table. All the data in the column will be lost.
  - Added the required column `productId` to the `nfe_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "nfe_items" DROP COLUMN "code",
DROP COLUMN "description",
ADD COLUMN     "productId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "nfe_items" ADD CONSTRAINT "nfe_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
