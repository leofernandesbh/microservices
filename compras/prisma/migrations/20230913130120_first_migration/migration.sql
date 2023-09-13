-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sale_price" DECIMAL(65,30) NOT NULL,
    "stock" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DECIMAL(65,30) NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_items" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "total_value" DECIMAL(65,30) NOT NULL,
    "purchase_id" TEXT NOT NULL,

    CONSTRAINT "purchase_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_items" ADD CONSTRAINT "purchase_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_items" ADD CONSTRAINT "purchase_items_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
