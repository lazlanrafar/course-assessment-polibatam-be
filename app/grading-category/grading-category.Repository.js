const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchGradingCategory: async () => {
    return await prisma.tbm_grading_category.findMany({
      select: {
        id: true,
        title: true,
        grading: {
          select: {
            lower_limit: true,
            upper_limit: true,
            grade: true,
          },
        },
      },
    });
  },
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
