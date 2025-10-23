/*
  Warnings:

  - You are about to drop the column `endTime` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `schedules` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "endDateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "startDateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
