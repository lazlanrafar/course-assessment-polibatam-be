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
};
