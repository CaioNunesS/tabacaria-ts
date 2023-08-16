-- CreateTable
CREATE TABLE "ImageProducts" (
    "productsId" TEXT NOT NULL,
    "ImageName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImageProducts_pkey" PRIMARY KEY ("productsId")
);

-- AddForeignKey
ALTER TABLE "ImageProducts" ADD CONSTRAINT "ImageProducts_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
