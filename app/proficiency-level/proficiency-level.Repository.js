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
  FetchProficiencyLevelById: async (id) => {
    return await prisma.tbm_proficiency_level.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        level: true,
        description: true,
        details: {
          select: {
            id: true,
            level: true,
            description: true,
            lower_limit: true,
            upper_limit: true,
          },
          orderBy: {
            level: "desc",
          },
        },
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
