const { InternalServerError, Ok } = require("../../utils/http-response");
const { StoreAssessment, FetchAssessment, FetchAssessmentById, UpdateAssessment } = require("./assessment.Repository");

module.exports = {
  GetAssessment: async (req, res) => {
    try {
      const result = await FetchAssessment();

      return Ok(res, result, "Successfully get assessment");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get assessment");
    }
  },
  GetAssessmentById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await FetchAssessmentById(id);

      return Ok(res, result, "Successfully get assessment");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get assessment");
    }
  },
  CreateAssessment: async (req, res) => {
    try {
      const body = req.body;

      await StoreAssessment(body);

      return Ok(res, {}, "Successfully create assessment");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create assessment");
    }
  },
  EditAssessment: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;

      await UpdateAssessment(id, body);

      return Ok(res, {}, "Successfully edit assessment");
    } catch (error) {
      return InternalServerError(res, error, "Failed to edit assessment");
    }
  },
};
