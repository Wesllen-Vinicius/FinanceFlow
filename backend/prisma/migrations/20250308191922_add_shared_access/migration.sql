-- CreateTable
CREATE TABLE "SharedAccess" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "shared_with" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharedAccess_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SharedAccess" ADD CONSTRAINT "SharedAccess_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedAccess" ADD CONSTRAINT "SharedAccess_shared_with_fkey" FOREIGN KEY ("shared_with") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
