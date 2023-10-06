const {
  GetGradingCategory,
  GetGradingCategoryById,
  CreateGradingCategory,
  EditGradingCategory,
} = require("./grading-category.Controller");
const { FormGradingCategoryMiddleware } = require("./grading-category.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetGradingCategory);
router.get("/:id", GetGradingCategoryById);
router.post("/", FormGradingCategoryMiddleware, CreateGradingCategory);
router.put("/:id", FormGradingCategoryMiddleware, EditGradingCategory);

module.exports = router;
