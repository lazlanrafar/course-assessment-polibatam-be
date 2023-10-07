const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchProficiencyLevel: async () => {
    return await prisma.tbm_proficiency_level.findMany({
      select: {
        id: true,
        level: true,
        description: true,
      },
      orderBy: {
        level: "asc",
      },
    });
  },
  StoreProficiencyLevel: async (data) => {
    return await prisma.tbm_proficiency_level.create({
      data,
    });
  },
  StoreProficiencyLevelDetail: async (data) => {
    return await prisma.tbm_proficiency_level_detail.create({
      data,
    });
  },
};
