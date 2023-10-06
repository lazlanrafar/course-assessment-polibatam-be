const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchGradingCategory: async () => {
    return await prisma.tbm_grading_category.findMany({
      select: {
        id: true,
        title: true,
        lower_limit: true,
        upper_limit: true,
        grade: true,
      },
      orderBy: {
        lower_limit: "asc",
      },
    });
  },
  FetchGradingCategoryById: async (id) => {
    return await prisma.tbm_grading_category.findUnique({
      where: {
        id,
      },
    });
  },
  StoreGradingCategory: async (data) => {
    await prisma.tbm_grading_category.create({
      data,
    });
  },
  UpdateGradingCategory: async (id, data) => {
    await prisma.tbm_grading_category.update({
      where: {
        id,
      },
      data,
    });
  },
};
