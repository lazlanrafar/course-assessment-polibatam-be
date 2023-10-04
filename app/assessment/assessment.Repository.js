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
      include: {
        course: {
          include: {
            program_studi: {
              select: {
                title: true,
              },
            },
          },
        },
        details: true,
      },
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

  // ASSESSMENT DETAIL
  FetchAssessmentDetailById: async (id) => {
    return await prisma.tbl_assessment_detail.findUnique({
      where: {
        id,
      },
    });
  },
  StoreAssessmentDetail: async (data) => {
    return await prisma.tbl_assessment_detail.create({
      data,
    });
  },
  UpdateAssessmentDetail: async (id, data) => {
    return await prisma.tbl_assessment_detail.update({
      where: {
        id,
      },
      data,
    });
  },
};
