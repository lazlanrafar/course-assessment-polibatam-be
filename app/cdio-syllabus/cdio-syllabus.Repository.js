const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchRubrikCDIOSyllabus: async () => {
    return await prisma.tbm_cdio_syllabus.findMany({
      select: {
        id: true,
        level: true,
        title: true,
        cdio_syllabus_parent: {
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
  FetchRubrikCDIOSyllabusById: async (id) => {
    return await prisma.tbm_cdio_syllabus.findUnique({
      where: {
        id: id,
      },
    });
  },
  FetchCDIOSyllabusParent: async () => {
    return await prisma.tbm_cdio_syllabus_parent.findMany({
      select: {
        id: true,
        level: true,
        title: true,
      },
      orderBy: {
        level: "asc",
      },
    });
  },
  StoreCDIOSyllabus: async (data) => {
    return await prisma.tbm_cdio_syllabus.create({
      data: data,
    });
  },
  UpdateCDIOSyllabus: async (id, data) => {
    return await prisma.tbm_cdio_syllabus.update({
      where: {
        id: id,
      },
      data: data,
    });
  },
};
