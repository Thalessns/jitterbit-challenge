-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_order_id_fkey";

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;
