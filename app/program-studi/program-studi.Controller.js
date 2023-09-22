const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchProgramStudi, FetchJurusan } = require("./program-studi.Repository");

module.exports = {
  GetProgramStudi: async (req, res) => {
    try {
      const result = await FetchProgramStudi();

      return Ok(res, result, "Successfully get program studi");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get program studi");
    }
  },
  GetJurusan: async (req, res) => {
    try {
      const result = await FetchJurusan();

      return Ok(res, result, "Successfully get jurusan");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get jurusan");
    }
  },
};
