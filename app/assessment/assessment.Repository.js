const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchAssessment: async () => {
    return prisma.tbl_assessment.findMany({
      select: {
        id: true,
        semester: true,
        academic_year: true,
        class: true,
        course: {
          select: {
            code: true,
            title: true,
          },
        },
      },
      orderBy: {
        course: {
          code: "asc",
        },
      },
    });
  },
  StoreAssessment: async (data) => {
    await prisma.tbl_assessment.create({
      data,
    });
  },
};
