const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GRADING = [
  {
    title: "Excellent",
    grading: [
      {
        lower_limit: 86,
        upper_limit: 100,
        grade: "A",
      },
    ],
  },
  {
    title: "Very Good",
    grading: [
      {
        lower_limit: 80,
        upper_limit: 85,
        grade: "A-",
      },
      {
        lower_limit: 75,
        upper_limit: 79,
        grade: "B+",
      },
    ],
  },
  {
    title: "Good",
    grading: [
      {
        lower_limit: 70,
        upper_limit: 74,
        grade: "B",
      },
      {
        lower_limit: 65,
        upper_limit: 69,
        grade: "B-",
      },
    ],
  },
  {
    title: "Fair",
    grading: [
      {
        lower_limit: 60,
        upper_limit: 64,
        grade: "C+",
      },
      {
        lower_limit: 55,
        upper_limit: 59,
        grade: "C",
      },
    ],
  },
  {
    title: "Poor",
    grading: [
      {
        lower_limit: 50,
        upper_limit: 54,
        grade: "C-",
      },
      {
        lower_limit: 45,
        upper_limit: 49,
        grade: "D+",
      },
      {
        lower_limit: 40,
        upper_limit: 44,
        grade: "D",
      },
      {
        lower_limit: 0,
        upper_limit: 39,
        grade: "E",
      },
    ],
  },
];

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

module.exports = sendGrading;
