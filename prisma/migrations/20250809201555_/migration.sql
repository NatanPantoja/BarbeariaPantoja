/*
  Warnings:

  - You are about to drop the column `userId` on the `profissionais` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `profissionais` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `profissionais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `profissionais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `profissionais` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `profissionais` DROP FOREIGN KEY `profissionais_userId_fkey`;

-- DropIndex
DROP INDEX `profissionais_userId_key` ON `profissionais`;

-- AlterTable
ALTER TABLE `profissionais` DROP COLUMN `userId`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `passwordResetExpires` DATETIME(3) NULL,
    ADD COLUMN `passwordResetToken` VARCHAR(191) NULL,
    ADD COLUMN `role` ENUM('ADMIN', 'PROFISSIONAL', 'RECEPCIONISTA', 'CLIENTE') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `profissionais_email_key` ON `profissionais`(`email`);
