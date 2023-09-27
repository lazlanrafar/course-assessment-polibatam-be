const { InternalServerError, BadRequest } = require("../../utils/http-response");
const { FetchCourseById, FetchCourseByCode } = require("./course.Repository");

module.exports = {
  FormCourseMiddleware: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { code } = req.body;

      if (id) {
        const course = await FetchCourseById(id);
        if (course.code !== code) {
          const checkCode = await FetchCourseByCode(code);
          if (checkCode) return BadRequest(res, {}, "Code already exists!");
        }
      } else {
        const checkCode = await FetchCourseByCode(code);
        if (checkCode) return BadRequest(res, {}, "Code already exists!");
      }

      req.body.sks = parseInt(req.body.sks);

      req.body.bobot_assignment = parseInt(req.body.bobot_assignment);
      req.body.bobot_quiz = parseInt(req.body.bobot_quiz);
      req.body.bobot_mid_exam = parseInt(req.body.bobot_mid_exam);
      req.body.bobot_final_exam = parseInt(req.body.bobot_final_exam);
      req.body.bobot_practice_or_project = parseInt(req.body.bobot_practice_or_project);
      req.body.bobot_presentation = parseInt(req.body.bobot_presentation);

      const total_bobot =
        req.body.bobot_assignment +
        req.body.bobot_quiz +
        req.body.bobot_mid_exam +
        req.body.bobot_final_exam +
        req.body.bobot_practice_or_project +
        req.body.bobot_presentation;
      if (total_bobot !== 100) return BadRequest(res, {}, "Total bobot must be 100!");

      req.body.target_level = parseInt(req.body.target_level);

      delete req.body.bobot_total;
      next();
    } catch (error) {
      return InternalServerError(res, error, "Something went wrong!, in Middleware");
    }
  },
  FormCourseLearningOutcomeMiddleware: async (req, res, next) => {
    try {
      const body = req.body;
      if (body.rubrik.length === 0) return BadRequest(res, {}, "Rubrik must be filled!");

      next();
    } catch (error) {
      return InternalServerError(res, error, "Something went wrong!, in Middleware");
    }
  },
};
