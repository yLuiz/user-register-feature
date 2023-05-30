/*
  Warnings:

  - You are about to drop the `endereco` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "endereco" DROP CONSTRAINT "endereco_user_id_fkey";

-- DropTable
DROP TABLE "endereco";

-- CreateTable
CREATE TABLE "adress" (
    "id" SERIAL NOT NULL,
    "cep" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "identification" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "adress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adress_user_id_key" ON "adress"("user_id");

-- AddForeignKey
ALTER TABLE "adress" ADD CONSTRAINT "adress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
