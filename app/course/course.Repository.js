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
        _count: {
          select: {
            course_learning_outcome: true,
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
  FetchCourseLearningOutcomeDetailByIdCourse: async (id_course) => {
    return await prisma.tbl_course_learning_outcome_detail.findMany({
      where: {
        course_learning_outcome: {
          id_course,
        },
      },
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
      orderBy: {
        rubrik: {
          cdio_syllabus: {
            level: "asc",
          },
        },
      },
    });
  },
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
  DestroyCourseLearningOutcome: async (id) => {
    return await prisma.tbl_course_learning_outcome.deleteMany({
      where: {
        id,
      },
    });
  },
  DestroyCourseLearningOutcomeDetailByIdCLO: async (id) => {
    return await prisma.tbl_course_learning_outcome_detail.deleteMany({
      where: {
        id_course_learning_outcome: id,
      },
    });
  },
  // ==================================================================
  // Course Assessment Plan
  // ==================================================================
  FetchCourseAssessmentPlanByIdCourse: async (id_course) => {
    return await prisma.tbl_course_assessment_plan.findMany({
      where: {
        id_course,
      },
      include: {
        rubrik: {
          select: {
            code: true,
            student_outcome: {
              select: {
                code: true,
              },
            },
          },
        },
      },
      orderBy: {
        rubrik: {
          code: "asc",
        },
      },
    });
  },
  FetchCourseAssessmentPlanById: async (id) => {
    return await prisma.tbl_course_assessment_plan.findUnique({
      where: {
        id,
      },
    });
  },
  StoreCourseAssessmentPlan: async (data) => {
    return await prisma.tbl_course_assessment_plan.create({
      data,
    });
  },
  UpdateCourseAssessmentPlan: async (id, data) => {
    return await prisma.tbl_course_assessment_plan.update({
      where: {
        id,
      },
      data,
    });
  },
  DestroyCourseAssessmentPlanByIdCourse: async (id_course) => {
    return await prisma.tbl_course_assessment_plan.deleteMany({
      where: {
        id_course,
      },
    });
  },
};
