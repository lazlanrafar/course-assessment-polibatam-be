const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchUser: async () => {
    return await prisma.tbm_user.findMany();
  },
  FetchUserByNIP: async (nip) => {
    return await prisma.tbm_user.findUnique({
      where: {
        uid: nip,
      },
    });
  },
  StoreUser: async (nip) => {
    return await prisma.tbm_user.create({
      data: {
        uid: nip,
      },
    });
  },
};
