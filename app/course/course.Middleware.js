const { InternalServerError, BadRequest } = require("../../utils/http-response");
const { FetchCourseById, FetchCourseByCode } = require("./course.Repository");

module.exports = {
  FormCourseMiddleware: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { code } = req.body;

      // if (id && code) {
      //   const course = await FetchCourseById(id);
      //   if (course.code !== code) {
      //     const checkCode = await FetchCourseByCode(code);
      //     if (checkCode) return BadRequest(res, {}, "Code already exists!");
      //   }
      // } else {
      //   const checkCode = await FetchCourseByCode(code);
      //   if (checkCode) return BadRequest(res, {}, "Code already exists!");
      // }

      if (req.body.sks) req.body.sks = parseInt(req.body.sks);

      if (req.body.bobot_assignment) req.body.bobot_assignment = parseInt(req.body.bobot_assignment);
      if (req.body.bobot_quiz) req.body.bobot_quiz = parseInt(req.body.bobot_quiz);
      if (req.body.bobot_mid_exam) req.body.bobot_mid_exam = parseInt(req.body.bobot_mid_exam);
      if (req.body.bobot_final_exam) req.body.bobot_final_exam = parseInt(req.body.bobot_final_exam);
      if (req.body.bobot_practice_or_project) req.body.bobot_practice_or_project = parseInt(req.body.bobot_practice_or_project);
      if (req.body.bobot_presentation) req.body.bobot_presentation = parseInt(req.body.bobot_presentation);

      if (req.body.total_assignment) req.body.total_assignment = parseInt(req.body.total_assignment);
      if (req.body.total_quiz) req.body.total_quiz = parseInt(req.body.total_quiz);
      if (req.body.total_mid_exam) req.body.total_mid_exam = parseInt(req.body.total_mid_exam);
      if (req.body.total_final_exam) req.body.total_final_exam = parseInt(req.body.total_final_exam);
      if (req.body.total_practice_or_project) req.body.total_practice_or_project = parseInt(req.body.total_practice_or_project);
      if (req.body.total_presentation) req.body.total_presentation = parseInt(req.body.total_presentation);

      delete req.body.bobot_total;
      next();
    } catch (error) {
      console.log(error);
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
