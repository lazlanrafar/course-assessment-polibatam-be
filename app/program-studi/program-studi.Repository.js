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
      },
      orderBy: {
        title: "asc",
      },
    });
  },
  FetchJurusan: async () => {
    return await prisma.tbm_jurusan.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: {
        title: "asc",
      },
    });
  },
};
