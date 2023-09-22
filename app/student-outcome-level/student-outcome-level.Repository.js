const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchStudentOutcomeLevel: async () => {
    return await prisma.tbm_student_outcome_level.findMany({
      select: {
        id: true,
        level: true,
        title: true,
        description: true,
      },
      orderBy: {
        level: "asc",
      },
    });
  },
  FetchStudentOutcomeLevelById: async (id) => {
    return await prisma.tbm_student_outcome_level.findUnique({
      where: {
        id,
      },
    });
  },
  StoreStudentOutcomeLevel: async (data) => {
    await prisma.tbm_student_outcome_level.create({
      data,
    });
  },
  UpdateStudentOutcomeLevel: async (id, data) => {
    await prisma.tbm_student_outcome_level.update({
      where: {
        id,
      },
      data,
    });
  },
};
