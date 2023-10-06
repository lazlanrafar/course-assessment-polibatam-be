const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchProgramStudi: async () => {
    return await prisma.tbm_program_studi.findMany({
      select: {
        id: true,
        title: true,
        jurusan: {
          select: {
            title: true,
          },
        },
        _count: {
          select: {
            student_outcome: true,
            rubrik: true,
            course: true,
          },
        },
      },
      orderBy: {
        jurusan: {
          title: "asc",
        },
      },
    });
  },
  FetchProgramStudiById: async (id) => {
    return await prisma.tbm_program_studi.findUnique({
      where: {
        id: id,
      },
    });
  },
  StoreProgramStudi: async (data) => {
    return await prisma.tbm_program_studi.create({
      data: data,
    });
  },
  UpdateProgramStudi: async (id, data) => {
    return await prisma.tbm_program_studi.update({
      where: {
        id: id,
      },
      data: data,
    });
  },
};
