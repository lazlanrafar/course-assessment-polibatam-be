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
  FetchUserIsAdminByNIP: async (nip) => {
    const user = await prisma.tbm_user.findUnique({
      where: {
        uid: nip,
      },
    });
    return user ? true : false;
  },
  StoreUser: async (nip) => {
    return await prisma.tbm_user.create({
      data: {
        uid: nip,
      },
    });
  },
  DestroyUser: async (nip) => {
    return await prisma.tbm_user.delete({
      where: {
        uid: nip,
      },
    });
  },
};
