const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchJurusan } = require("./jurusan.Repository");

module.exports = {
  GetJurusan: async (req, res) => {
    try {
      const result = await FetchJurusan();

      return Ok(res, result, "Successfully get jurusan");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get jurusan");
    }
  },
};
