-- CreateTable
CREATE TABLE "TestResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "studySetId" TEXT NOT NULL,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestCardResult" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isCorrectAnswer" BOOLEAN NOT NULL DEFAULT false,
    "testResultId" TEXT NOT NULL,

    CONSTRAINT "TestCardResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestCardResultChoice" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "isChosen" BOOLEAN NOT NULL DEFAULT false,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "testCardResultId" TEXT NOT NULL,

    CONSTRAINT "TestCardResultChoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_studySetId_fkey" FOREIGN KEY ("studySetId") REFERENCES "StudySet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCardResult" ADD CONSTRAINT "TestCardResult_testResultId_fkey" FOREIGN KEY ("testResultId") REFERENCES "TestResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCardResultChoice" ADD CONSTRAINT "TestCardResultChoice_testCardResultId_fkey" FOREIGN KEY ("testCardResultId") REFERENCES "TestCardResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
