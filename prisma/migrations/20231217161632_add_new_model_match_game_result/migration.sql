-- CreateTable
CREATE TABLE "MatchGameResult" (
    "id" TEXT NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRecord" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "studySetId" TEXT NOT NULL,

    CONSTRAINT "MatchGameResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MatchGameResult" ADD CONSTRAINT "MatchGameResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchGameResult" ADD CONSTRAINT "MatchGameResult_studySetId_fkey" FOREIGN KEY ("studySetId") REFERENCES "StudySet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
