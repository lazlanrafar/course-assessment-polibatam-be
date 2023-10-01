const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchAssessmentType: async () => {
    return await prisma.tbm_assessment_type.findMany({
      select: {
        id: true,
        code: true,
        title: true,
      },
      orderBy: {
        created_at: "asc",
      },
    });
  },
};
