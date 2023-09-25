const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchProgramStudiById } = require("../program-studi/program-studi.Repository");
const { FetchRubrikByIdProgramStudi, StoreRubrik, FetchRubrikById } = require("./rubrik.Repository");

module.exports = {
  GetRubrikByIdProgramStudi: async (req, res) => {
    try {
      const { id_program_studi } = req.params;

      const program_studi = await FetchProgramStudiById(id_program_studi);
      const data = await FetchRubrikByIdProgramStudi(id_program_studi);

      data.forEach((item) => {
        item.label = `${item.code}. ${item.title}`;
      });

      const payload = {
        program_studi: program_studi,
        data: data,
      };

      return Ok(res, payload, "Successfully get rubrik by id program studi");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get rubrik by id program studi");
    }
  },
  GetRubrikById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await FetchRubrikById(id);

      return Ok(res, result, "Successfully get rubrik detail");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get rubrik detail");
    }
  },
  CreateRubrik: async (req, res) => {
    try {
      const body = req.body;
      await StoreRubrik(body);

      return Ok(res, {}, "Successfully create rubrik");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create rubrik");
    }
  },
};
