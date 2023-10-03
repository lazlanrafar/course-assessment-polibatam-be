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
  FetchAssessmentById: async (id) => {
    return await prisma.tbl_assessment.findUnique({
      where: {
        id,
      },
    });
  },
  StoreAssessment: async (data) => {
    return await prisma.tbl_assessment.create({
      data,
    });
  },
  UpdateAssessment: async (id, data) => {
    return await prisma.tbl_assessment.update({
      where: {
        id,
      },
      data,
    });
  },
  DestroyAssessment: async (id) => {
    return await prisma.tbl_assessment.delete({
      where: {
        id,
      },
    });
  },
  DestroyAssessmentDetailByIdAssessment: async (id) => {
    return await prisma.tbl_assessment_detail.deleteMany({
      where: {
        id_assessment: id,
      },
    });
  },
};
