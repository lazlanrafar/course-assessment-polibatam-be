const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const DATA = [
  {
    title: "Written and oral question",
  },
  {
    title: "Performance ratings",
  },
  {
    title: "Product reviews",
  },
  {
    title: "Journal and portfolios",
  },
  {
    title: "Self-report instruments",
  },
];

async function sendAssessmentMethods() {
  DATA.forEach(async (assessmentMethod) => {
    await prisma.tbm_assessment_method.create({
      data: {
        title: assessmentMethod.title,
      },
    });
  });
}

module.exports = sendAssessmentMethods;
