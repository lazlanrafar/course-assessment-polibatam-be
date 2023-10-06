const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchRubrikByIdProgramStudi: async (id_program_studi) => {
    return await prisma.tbm_rubrik.findMany({
      where: {
        ...(id_program_studi && { id_program_studi }),
      },
      select: {
        id: true,
        code: true,
        title: true,
        student_outcome: {
          select: {
            code: true,
          },
        },
        cdio_syllabus: {
          select: {
            level: true,
          },
        },
      },
      orderBy: {
        code: "asc",
      },
    });
  },
  FetchRubrikById: async (id) => {
    return await prisma.tbm_rubrik.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        id_program_studi: true,
        id_cdio_syllabus: true,
        id_student_outcome: true,
        code: true,
        title: true,
        desc_level_1: true,
        desc_level_2: true,
        desc_level_3: true,
        desc_level_4: true,
        desc_level_5: true,
        _count: {
          select: {
            course_assessment_plan: true,
            course_learning_outcome_detail: true,
          },
        },
      },
    });
  },
  FetchRubrikListByIdCourse: async (id_course) => {
    return await prisma.tbm_rubrik.findMany({
      where: {
        program_studi: {
          course: {
            some: {
              id: id_course,
            },
          },
        },
      },
      select: {
        id: true,
        code: true,
        title: true,
        cdio_syllabus: {
          select: {
            level: true,
          },
        },
        student_outcome: {
          select: {
            code: true,
          },
        },
      },
      orderBy: {
        cdio_syllabus: {
          level: "asc",
        },
      },
    });
  },
  StoreRubrik: async (data) => {
    return await prisma.tbm_rubrik.create({
      data: data,
    });
  },
  UpdateRubrik: async (id, data) => {
    return await prisma.tbm_rubrik.update({
      where: {
        id: id,
      },
      data: data,
    });
  },
  DestroyRubrik: async (id) => {
    return await prisma.tbm_rubrik.delete({
      where: {
        id: id,
      },
    });
  },
};
