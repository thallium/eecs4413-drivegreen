-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('Audi', 'BMW', 'Benz', 'Ford', 'GeneralMotors', 'Honda', 'Jeep', 'Toyota', 'Tesla');

-- CreateEnum
CREATE TYPE "Shape" AS ENUM ('S', 'M', 'L');

-- CreateTable
CREATE TABLE "Vehicle" (
    "vid" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "brand" "Brand" NOT NULL DEFAULT 'Ford',
    "shape" "Shape" NOT NULL DEFAULT 'S',
    "modelYear" INTEGER NOT NULL DEFAULT 2000,
    "damaged" BOOLEAN NOT NULL DEFAULT false,
    "Mileage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL,
    "hotDealed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("vid")
);
