-- CreateTable
CREATE TABLE "recipients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "recipients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nfes" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "serie" INTEGER NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "nfes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nfe_items" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unitary_value" DECIMAL(65,30) NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "total_value" DECIMAL(65,30) NOT NULL,
    "nfe_id" TEXT NOT NULL,

    CONSTRAINT "nfe_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "nfe_items" ADD CONSTRAINT "nfe_items_nfe_id_fkey" FOREIGN KEY ("nfe_id") REFERENCES "nfes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
