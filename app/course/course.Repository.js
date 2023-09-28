const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchCourse: async () => {
    return await prisma.tbl_course.findMany({
      select: {
        id: true,
        code: true,
        title: true,
        sks: true,
        target_level: true,
        program_studi: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        program_studi: {
          title: "asc",
        },
      },
    });
  },
  FetchCourseById: async (id) => {
    return await prisma.tbl_course.findUnique({
      where: {
        id,
      },
      include: {
        program_studi: {
          select: {
            title: true,
          },
        },
        course_learning_outcome: {
          include: {
            assessment_method: {
              select: {
                title: true,
              },
            },
            details: {
              select: {
                rubrik: {
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
                },
              },
            },
          },
          orderBy: {
            code: "asc",
          },
        },
      },
    });
  },
  FetchCourseByCode: async (code) => {
    return await prisma.tbl_course.findUnique({
      where: {
        code,
      },
    });
  },
  StoreCourse: async (data) => {
    return await prisma.tbl_course.create({
      data,
    });
  },
  UpdateCourse: async (id, data) => {
    return await prisma.tbl_course.update({
      where: {
        id,
      },
      data,
    });
  },

  // ==================================================================
  // Course Learning Outcomes
  // ==================================================================

  FetchCourseLearningOutcomeById: async (id) => {
    return await prisma.tbl_course_learning_outcome.findUnique({
      where: {
        id,
      },
      include: {
        details: {
          select: {
            rubrik: {
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
            },
          },
        },
      },
    });
  },
  StoreCourseLearningOutcome: async (data) => {
    return await prisma.tbl_course_learning_outcome.create({
      data,
    });
  },
  StoreCourseLearningOutcomeDetail: async (data) => {
    return await prisma.tbl_course_learning_outcome_detail.create({
      data,
    });
  },
  UpdateCourseLearningOutcome: async (id, data) => {
    return await prisma.tbl_course_learning_outcome.update({
      where: {
        id,
      },
      data,
    });
  },
  DestroyCourseLearningOutcomeDetailByIdCLO: async (id) => {
    return await prisma.tbl_course_learning_outcome_detail.deleteMany({
      where: {
        id_course_learning_outcome: id,
      },
    });
  },
};
