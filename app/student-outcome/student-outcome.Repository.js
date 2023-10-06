const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchStudentOutcome: async (id_program_studi) => {
    return await prisma.tbm_student_outcome.findMany({
      where: {
        ...(id_program_studi && { id_program_studi }),
      },
      select: {
        id: true,
        code: true,
        title: true,
        program_studi: {
          select: {
            title: true,
          },
        },
        _count: {
          select: {
            rubrik: true,
          },
        },
      },
      orderBy: {
        code: "asc",
      },
    });
  },
  FetchStudentOutcomeById: async (id) => {
    return await prisma.tbm_student_outcome.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        id_program_studi: true,
        code: true,
        title: true,
        _count: {
          select: {
            rubrik: true,
          },
        },
      },
    });
  },
  StoreStudentOutcome: async (data) => {
    return await prisma.tbm_student_outcome.create({
      data,
    });
  },
  UpdateStudentOutcome: async (id, data) => {
    return await prisma.tbm_student_outcome.update({
      where: {
        id,
      },
      data,
    });
  },
  DestroyStudentOutcome: async (id) => {
    return await prisma.tbm_student_outcome.delete({
      where: {
        id,
      },
    });
  },
};
