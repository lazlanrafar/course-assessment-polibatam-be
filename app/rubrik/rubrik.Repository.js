const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchRubrikByIdProgramStudi: async (id_program_studi) => {
    return await prisma.tbm_rubrik.findMany({
      where: {
        id_program_studi,
      },
      include: {
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
    });
  },
  StoreRubrik: async (data) => {
    return await prisma.tbm_rubrik.create({
      data: data,
    });
  },
};
