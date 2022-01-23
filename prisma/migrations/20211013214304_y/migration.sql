-- CreateTable
CREATE TABLE "_solved" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_solved_AB_unique" ON "_solved"("A", "B");

-- CreateIndex
CREATE INDEX "_solved_B_index" ON "_solved"("B");

-- AddForeignKey
ALTER TABLE "_solved" ADD FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_solved" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
