/*
  Warnings:

  - You are about to drop the column `user_id` on the `address` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[customer_id]` on the table `address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customer_id` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CustomerGender" AS ENUM ('masculine', 'feminine', 'other');

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_user_id_fkey";

-- DropIndex
DROP INDEX "address_user_id_key";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "user_id",
ADD COLUMN     "customer_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "user";

-- DropEnum
DROP TYPE "UserGender";

-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "gender" "CustomerGender" NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN DEFAULT false,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_cpf_key" ON "customer"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "address_customer_id_key" ON "address"("customer_id");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
