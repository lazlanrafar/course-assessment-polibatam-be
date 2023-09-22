const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchStudentOutcome: async () => {
    return await prisma.tbm_student_outcome.findMany({
      select: {
        id: true,
        code: true,
        title: true,
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
