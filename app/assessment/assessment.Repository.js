const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  StoreAssessment: async (data) => {
    await prisma.tbl_assessment.create({
      data,
    });
  },
};
