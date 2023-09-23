const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchCourseById: async (id) => {
    return await prisma.tbl_course.findUnique({
      where: {
        id,
      },
    });
  },
  FetchCourseByCode: async (code) => {
    return await prisma.tbl_course.findUnique({
      where: {
        code,
      },
    });
  },
  StoreCourse: async (data) => {
    return await prisma.tbl_course.create({
      data,
    });
  },
};
