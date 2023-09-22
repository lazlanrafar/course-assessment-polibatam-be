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
  FetchAssessmentMethodById: async (id) => {
    return await prisma.tbm_assessment_method.findUnique({
      where: {
        id,
      },
    });
  },
  StoreAssessmentMethod: async (data) => {
    await prisma.tbm_assessment_method.create({
      data,
    });
  },
  UpdateAssessmentMethod: async (id, data) => {
    await prisma.tbm_assessment_method.update({
      where: {
        id,
      },
      data,
    });
  },
};
