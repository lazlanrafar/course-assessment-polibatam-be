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
  FetchJurusanById: async (id) => {
    return await prisma.tbm_jurusan.findUnique({
      where: {
        id: id,
      },
    });
  },
  StoreJurusan: async (data) => {
    return await prisma.tbm_jurusan.create({
      data: data,
    });
  },
};
