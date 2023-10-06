const { InternalServerError, Ok } = require("../../utils/http-response");
const {
  FetchStudentOutcome,
  StoreStudentOutcome,
  FetchStudentOutcomeById,
  UpdateStudentOutcome,
} = require("./student-outcome.Repository");

module.exports = {
  GetStudentOutcome: async (req, res) => {
    try {
      const { id_program_studi } = req.query;
      const result = await FetchStudentOutcome(id_program_studi);

      return Ok(res, result, "Successfully get student outcome");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get student outcome");
    }
  },
  GetStudentOutcomeById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await FetchStudentOutcomeById(id);

      return Ok(res, result, "Successfully get student outcome detail");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get student outcome detail");
    }
  },
  CreateStudentOutcome: async (req, res) => {
    try {
      const body = req.body;

      await StoreStudentOutcome(body);

      return Ok(res, {}, "Successfully create student outcome");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create student outcome");
    }
  },
  EditStudentOutcome: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;

      await UpdateStudentOutcome(id, body);

      return Ok(res, {}, "Successfully edit student outcome");
    } catch (error) {
      return InternalServerError(res, error, "Failed to edit student outcome");
    }
  },
};
