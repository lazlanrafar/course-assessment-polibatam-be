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
    });
  },
  FetchStudentOutcomeByCode: async (code) => {
    return await prisma.tbm_student_outcome.findUnique({
      where: {
        code,
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
};
