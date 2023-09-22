const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchProgramStudi, FetchJurusan, StoreProgramStudi } = require("./program-studi.Repository");

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
  CreateProgramStudi: async (req, res) => {
    try {
      const body = req.body;

      const result = await StoreProgramStudi(body);

      return Ok(res, result, "Successfully create program studi");
    } catch (error) {
      //   console.log(error);
      return InternalServerError(res, error, "Failed to create program studi");
    }
  },
};
