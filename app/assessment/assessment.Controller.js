const { InternalServerError, Ok } = require("../../utils/http-response");
const {
  StoreAssessment,
  FetchAssessment,
  FetchAssessmentById,
  UpdateAssessment,
  DestroyAssessmentDetailByIdAssessment,
  DestroyAssessment,
  StoreAssessmentDetail,
  FetchAssessmentDetailById,
  UpdateAssessmentDetail,
  DestroyAssessmentDetail,
} = require("./assessment.Repository");

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
  DeleteAssessment: async (req, res) => {
    try {
      const { id } = req.params;

      await DestroyAssessmentDetailByIdAssessment(id);
      await DestroyAssessment(id);

      return Ok(res, {}, "Successfully delete assessment");
    } catch (error) {
      return InternalServerError(res, error, "Failed to delete assessment");
    }
  },
  // ASSESSMENT DETAIL
  GetAssessmentDetailById: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await FetchAssessmentDetailById(id);

      return Ok(res, result, "Successfully get assessment detail");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get assessment detail");
    }
  },
  CreateAssessmentDetail: async (req, res) => {
    try {
      const body = req.body;

      await StoreAssessmentDetail(body);

      return Ok(res, {}, "Successfully create assessment detail");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to create assessment detail");
    }
  },
  EditAssessmentDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;

      await UpdateAssessmentDetail(id, body);

      return Ok(res, {}, "Successfully edit assessment detail");
    } catch (error) {
      return InternalServerError(res, error, "Failed to edit assessment detail");
    }
  },
  DeleteAssessmentDetail: async (req, res) => {
    try {
      const { id } = req.params;

      await DestroyAssessmentDetail(id);

      return Ok(res, {}, "Successfully delete assessment detail");
    } catch (error) {
      return InternalServerError(res, error, "Failed to delete assessment detail");
    }
  },
};
