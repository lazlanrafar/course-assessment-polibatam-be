const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const DATA = [
  {
    title: "Manajemen Bisnis",
    program_studi: [
      {
        title: "Diploma 3 Akuntansi",
      },
      {
        title: "Sarjana Terapan Akuntansi Manajerial",
      },
      {
        title: "Sarjana Terapan Administrasi Bisnis Terapan",
      },
      {
        title: "Sarjana Terapan Logistik Perdagangan Internasional",
      },
      {
        title:
          "Sarjana Terapan Administrasi Bisnis Terapan (International Class)",
      },
      {
        title: "Program Studi D2 Jalur Cepat Distribusi Barang",
      },
    ],
  },
  {
    title: "Teknik Elektro",
    program_studi: [
      {
        title: "Diploma 3 Teknik Elektronika Manufaktur",
      },
      {
        title: "Sarjana Terapan Teknologi Rekayasa Elektronika",
      },
      {
        title: "Diploma 3 Teknik Instrumentasi",
      },
      {
        title: "Sarjana Terapan Teknik Mekatronika",
      },
      {
        title: "Sarjana Terapan Teknologi Rekayasa Pembangkit Energi",
      },
      {
        title: "Sarjana Terapan Teknik Robotika",
      },
    ],
  },
  {
    title: "Teknik Informatika",
    program_studi: [
      {
        title: "Diploma 3 Teknik Informatika",
      },
      {
        title: "Diploma 3 Teknologi Geomatika",
      },
      {
        title: "Sarjana Terapan Animasi",
      },
      {
        title: "Sarjana Terapan Teknologi Rekayasa Multimedia",
      },
      {
        title: "Sarjana Terapan Rekayasa Keamanan Siber",
      },
      {
        title: "Sarjana Terapan Rekayasa Perangkat Lunak",
      },
    ],
  },
  {
    title: "Teknik Mesin",
    program_studi: [
      {
        title: "Diploma 3 Teknik Mesin",
      },
      {
        title: "Diploma 3 Teknik Perawatan Pesawat Udara",
      },
      {
        title: "Sarjana Terapan Teknologi Rekayasa Konstruksi Perkapalan",
      },
      {
        title: "Sarjana Terapan Teknologi Rekayasa Pengelasan dan Fabrikasi",
      },
      {
        title: "Program Profesi Insinyur (PSPPI)",
      },
    ],
  },
];

async function sendProgramStudi() {
  DATA.forEach(async (jurusan) => {
    await prisma.tbm_jurusan
      .create({
        data: {
          title: jurusan.title,
        },
      })
      .then((res) => {
        jurusan.program_studi.forEach(async (program_studi) => {
          await prisma.tbm_program_studi.create({
            data: {
              id_jurusan: res.id,
              title: program_studi.title,
            },
          });
        });
      });
  });
}

module.exports = sendProgramStudi;
