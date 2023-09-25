const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchRubrikByIdProgramStudi } = require("./rubrik.Repository");

module.exports = {
  GetRubrikByIdProgramStudi: async (req, res) => {
    try {
      const { id_program_studi } = req.params;

      const result = await FetchRubrikByIdProgramStudi(id_program_studi);

      return Ok(res, result, "Successfully get rubrik by id program studi");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get rubrik by id program studi");
    }
  },
};
