const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const DATA = [
  {
    level: 1,
    title: "FUNDAMENTAL KNOWLEDGE AND REASONING",
    cdio_syllabus: [
      {
        level: 1.1,
        title: "KNOWLEDGE OF UNDERLYING MATHEMATICS SCIENCE",
      },
      {
        level: 1.2,
        title: "CORE ENGINEERING FUNDAMENTAL KNOWLEDGE",
      },
      {
        level: 1.3,
        title: "ADVANCED ENGINEERING FUNDAMENTAL KNOWLEDGE, METHODS AND TOOLS",
      },
      {
        level: 1.4,
        title: "KNOWLEDGE OF SOCIAL SCIENCES AND HUMANITIES",
      },
    ],
  },
  {
    level: 2,
    title: "PERSONAL AND PROFESSIONAL SKILLS AND ATTRIBUTES",
    cdio_syllabus: [
      {
        level: 2.1,
        title: "ANALYTIC REASONING AND PROBLEM SOLVING",
      },
      {
        level: 2.2,
        title: "EXPERIMENTATION, INVESTIGATION AND KNOWLEDGE DISCOVERY",
      },
      {
        level: 2.3,
        title: "SYSTEM THINKING",
      },
      {
        level: 2.4,
        title: "ATTITUDES, THOUGHT AND LEARNING",
      },
      {
        level: 2.5,
        title: "ETHICS, EQUITY AND OTHER RESPONSIBILITIES",
      },
    ],
  },
  {
    level: 3,
    title: "INTERPERSONAL SKILLS: COLLABORATION, TEAMWORK AND COMMUNICATION",
    cdio_syllabus: [
      {
        level: 3.1,
        title: "TEAMWORK AND COLLABORATION",
      },
      {
        level: 3.2,
        title: "COMMUNICATIONS",
      },
      {
        level: 3.3,
        title: "COMMUNICATIONS IN FOREIGN LANGUAGES",
      },
    ],
  },
  {
    level: 4,
    title:
      "CONCEIVING, DESIGNING, IMPLEMENTING, AND OPERATING SYSTEMS IN THE ENTERPRISE, SOCIETAL AND ENVIRONMENTAL CONTEXT - THE INNOVATION PROCESS",
    cdio_syllabus: [
      {
        level: 4.1,
        title: "EXTERNAL, SOCIETAL AND ENVIRONMENTAL CONTEXT",
      },
      {
        level: 4.2,
        title: "ENTERPRISE AND BUSINESS CONTEXT",
      },
      {
        level: 4.3,
        title: "CONCEIVING, SYSTEM ENGINEERING AND MANAGEMENT",
      },
      {
        level: 4.4,
        title: "DESIGNING",
      },
      {
        level: 4.5,
        title: "IMPLEMENTING",
      },
      {
        level: 4.6,
        title: "OPERATING",
      },
    ],
  },
];

async function sendCdioSyllabus() {
  DATA.forEach(async (data) => {
    await prisma.tbm_cdio_syllabus_parent
      .create({
        data: {
          level: data.level,
          title: data.title,
        },
      })
      .then((res) => {
        data.cdio_syllabus.forEach(async (cdio_syllabus) => {
          await prisma.tbm_cdio_syllabus.create({
            data: {
              id_cdio_syllabus_parent: res.id,
              level: cdio_syllabus.level,
              title: cdio_syllabus.title,
            },
          });
        });
      });
  });
}

module.exports = sendCdioSyllabus;
