const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchGrading: async () => {
    return await prisma.tbm_grading.findMany({
      select: {
        grading_category: {
          select: {
            id: true,
            title: true,
          },
        },
        lower_limit: true,
        upper_limit: true,
        grade: true,
      },
      orderBy: {
        lower_limit: "desc",
      },
    });
  },
};
