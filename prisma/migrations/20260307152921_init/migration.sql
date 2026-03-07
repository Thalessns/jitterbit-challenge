-- CreateTable
CREATE TABLE "order" (
    "orderId" VARCHAR(20) NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "items" (
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("order_id","product_id")
);

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;
