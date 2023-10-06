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
        _count: {
          select: {
            rubrik: true,
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
      select: {
        id: true,
        id_cdio_syllabus_parent: true,
        level: true,
        title: true,
        _count: {
          select: {
            rubrik: true,
          },
        },
      },
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
  DestroyCDIOSyllabus: async (id) => {
    return await prisma.tbm_cdio_syllabus.delete({
      where: {
        id: id,
      },
    });
  },
};
