const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchStudentOutcomeLevel: async () => {
    return await prisma.tbm_student_outcome_level.findMany({
      select: {
        id: true,
        level: true,
        title: true,
        description: true,
      },
      orderBy: {
        level: "asc",
      },
    });
  },
  StoreStudentOutcomeLevel: async (data) => {
    await prisma.tbm_student_outcome_level.create({
      data,
    });
  },
};
