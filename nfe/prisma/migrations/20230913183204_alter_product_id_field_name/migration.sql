/*
  Warnings:

  - You are about to drop the column `productId` on the `nfe_items` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `nfe_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "nfe_items" DROP CONSTRAINT "nfe_items_productId_fkey";

-- AlterTable
ALTER TABLE "nfe_items" DROP COLUMN "productId",
ADD COLUMN     "product_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "nfe_items" ADD CONSTRAINT "nfe_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
