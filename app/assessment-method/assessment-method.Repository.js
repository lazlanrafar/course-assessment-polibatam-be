const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchAssessmentMethod: async () => {
    return await prisma.tbm_assessment_method.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: {
        created_at: "asc",
      },
    });
  },
};
