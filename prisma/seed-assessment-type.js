const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ASSESSMENT_TYPES = [
  {
    code: "A",
    title: "Assignment",
  },
  {
    code: "P",
    title: "Practice or Project",
  },
  {
    code: "Q",
    title: "Quiz",
  },
  {
    code: "MSE",
    title: "Mid-Semester Exam",
  },
  {
    code: "FSE",
    title: "Final-Semester Exam",
  },
  {
    code: "PP",
    title: "Project Presentation, demo, team meeting",
  },
];

async function sendAssessmentTypes() {
  ASSESSMENT_TYPES.forEach(async (assessmentType) => {
    await prisma.tbm_assessment_type.create({
      data: {
        code: assessmentType.code,
        title: assessmentType.title,
      },
    });
  });
}

module.exports = sendAssessmentTypes;
