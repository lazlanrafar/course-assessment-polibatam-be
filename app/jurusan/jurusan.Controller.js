const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchJurusan, StoreJurusan } = require("./jurusan.Repository");

module.exports = {
  GetJurusan: async (req, res) => {
    try {
      const result = await FetchJurusan();

      return Ok(res, result, "Successfully get jurusan");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get jurusan");
    }
  },
  CreateJurusan: async (req, res) => {
    try {
      const body = req.body;

      await StoreJurusan(body);

      return Ok(res, null, "Successfully create jurusan");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create jurusan");
    }
  },
};
