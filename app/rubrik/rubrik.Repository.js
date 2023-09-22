const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchRubrik: async () => {
    return await prisma.tbm_rubrik.findMany({
      select: {
        id: true,
        level: true,
        title: true,
        cdio_syllabus: {
          select: {
            level: true,
            title: true,
          },
        },
      },
      orderBy: {
        level: "asc",
      },
    });
  },
};
