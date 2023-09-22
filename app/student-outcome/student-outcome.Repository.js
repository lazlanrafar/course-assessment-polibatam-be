const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchStudentOutcome: async () => {
    return await prisma.tbm_student_outcome.findMany({
      select: {
        id: true,
        code: true,
        title: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  },
};
