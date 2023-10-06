const { InternalServerError, Ok } = require("../../utils/http-response");
const {
  FetchGradingCategory,
  FetchGradingCategoryById,
  StoreGradingCategory,
  UpdateGradingCategory,
} = require("./grading-category.Repository");

module.exports = {
  GetGradingCategory: async (req, res) => {
    try {
      const result = await FetchGradingCategory();

      return Ok(res, result, "Successfully get grading category");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to get grading category");
    }
  },
  GetGradingCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await FetchGradingCategoryById(id);

      return Ok(res, result, "Successfully get grading category");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get grading category");
    }
  },
  CreateGradingCategory: async (req, res) => {
    try {
      const body = req.body;

      await StoreGradingCategory(body);

      return Ok(res, {}, "Successfully create grading category");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to create grading category");
    }
  },
  EditGradingCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;

      await UpdateGradingCategory(id, body);

      return Ok(res, {}, "Successfully edit grading category");
    } catch (error) {
      return InternalServerError(res, error, "Failed to edit grading category");
    }
  },
};
