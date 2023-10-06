const { InternalServerError, Ok } = require("../../utils/http-response");
const {
  FetchProgramStudi,
  FetchJurusan,
  StoreProgramStudi,
  FetchProgramStudiById,
  UpdateProgramStudi,
} = require("./program-studi.Repository");

module.exports = {
  GetProgramStudi: async (req, res) => {
    try {
      const result = await FetchProgramStudi();

      return Ok(res, result, "Successfully get program studi");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get program studi");
    }
  },
  GetProgramStudiById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await FetchProgramStudiById(id);

      return Ok(res, result, "Successfully get program studi detail");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get program studi detail");
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
  EditProgramStudi: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const result = await UpdateProgramStudi(id, body);

      return Ok(res, result, "Successfully edit program studi");
    } catch (error) {
      return InternalServerError(res, error, "Failed to edit program studi");
    }
  },
};
