const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GRADING = require("./seed-grading.json");

// =========================================== GRADING
function sendGrading() {
  GRADING.forEach(async (item) => {
    await prisma.tbm_grading_category
      .create({
        data: {
          title: item.title,
        },
      })
      .then((res) => {
        item.grading.forEach(async (grading) => {
          await prisma.tbm_grading.create({
            data: {
              id_grading_category: res.id,
              lower_limit: grading.lower_limit,
              upper_limit: grading.upper_limit,
              grade: grading.grade,
            },
          });
        });
      });
  });
}

sendGrading();
