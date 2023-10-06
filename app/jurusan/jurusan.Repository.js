const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchJurusan: async () => {
    return await prisma.tbm_jurusan.findMany({
      select: {
        id: true,
        title: true,
        _count: {
          select: {
            program_studi: true,
          },
        },
      },
      orderBy: {
        title: "asc",
      },
    });
  },
};
