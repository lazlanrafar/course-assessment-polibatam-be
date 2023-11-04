const {
  GetPercentageOfStudentsWithinEachCategory,
  GetStudentProficiencyLevelAttainmentForEachAssessmentTool,
  GetPercentageOfStudentWithinEachProficiencyLevel,
  GetAttainmentOfEachPerformanceIndicator,
  GetSummaryOfCourseAssessmentResults,
  ProficiencyLevelAverage,
} = require("../../utils/calculate-assessment");
const { InternalServerError, Ok, BadRequest } = require("../../utils/http-response");
const { FetchGrading } = require("../grading-category/grading-category.Repository");
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
      console.log(error);
      return InternalServerError(res, error, "Failed to get assessment");
    }
  },
  GetAssessmentById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await FetchAssessmentById(id);

      const Grading = await FetchGrading();

      result.details.forEach((item) => {
        for (const itt of Grading) {
          if (item.nilai_akhir >= itt.lower_limit && item.nilai_akhir <= itt.upper_limit) {
            item.grade = itt.grade;
            break;
          }
        }
      });

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
  ImportAssessmentDetail: async (req, res) => {
    try {
      const { data } = req.body;

      for (const iterator of data) {
        await StoreAssessmentDetail(iterator);
      }

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
  // ================================================================
  // ASSESSMENT RESULT
  // ================================================================
  GetAssessmentStep5: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await GetPercentageOfStudentsWithinEachCategory(id);

      return Ok(res, result, "Successfully get percentage of students within each category");
    } catch (error) {
      const message = "Failed to get percentage of students within each category";
      return InternalServerError(res, error, message);
    }
  },
  GetAssessmentStep6: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await GetStudentProficiencyLevelAttainmentForEachAssessmentTool(id);

      return Ok(res, result, "Successfully get Step 6");
    } catch (error) {
      const message = "Failed to get Step 6";
      return InternalServerError(res, error, message);
    }
  },
  GetAssessmentProficiencyLevelAverage: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await ProficiencyLevelAverage(id);

      return Ok(res, result, "Successfully get Assessment Proficiency Level");
    } catch (error) {
      const message = "Failed to get Assessment Proficiency Level";
      return InternalServerError(res, error, message);
    }
  },
  GetAssessmentStep7: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await GetPercentageOfStudentWithinEachProficiencyLevel(id);

      return Ok(res, result, "Successfully get Step 7");
    } catch (error) {
      const message = "Failed to get Step 7";
      return InternalServerError(res, error, message);
    }
  },
  GetAssessmentStep8: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await GetAttainmentOfEachPerformanceIndicator(id);

      return Ok(res, result, "Successfully get Step 8");
    } catch (error) {
      const message = "Failed to get Step 8";
      return InternalServerError(res, error, message);
    }
  },
  GetAssessmentStep9: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await GetSummaryOfCourseAssessmentResults(id);

      return Ok(res, result, "Successfully get Step 9");
    } catch (error) {
      const message = "Failed to get Step 9";
      return InternalServerError(res, error, message);
    }
  },
};
