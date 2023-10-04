const { InternalServerError, BadRequest } = require("../../utils/http-response");
const { FetchAssessmentById } = require("./assessment.Repository");

module.exports = {
  FormAssessmentMiddleware: (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) req.body.created_by = req.user.nik;

      next();
    } catch (error) {
      return InternalServerError(res, error, "Something went wrong!, in Middleware");
    }
  },
  FormAssessmentDetailMiddleware: async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const assessment = await FetchAssessmentById(body.id_assessment);
      if (!assessment) return BadRequest(res, {}, "Assessment not found!");

      let average_quiz = body.quiz.reduce((a, b) => parseInt(a) + parseInt(b), 0) / body.quiz.length;
      let average_practice_or_project =
        body.practice_or_project.reduce((a, b) => parseInt(a) + parseInt(b), 0) / body.practice_or_project.length;
      let average_assignment = body.assignment.reduce((a, b) => parseInt(a) + parseInt(b), 0) / body.assignment.length;
      let average_mid_exam = parseInt(body.mid_exam);
      let average_final_exam = parseInt(body.final_exam);
      let average_presentation = body.presentation.reduce((a, b) => parseInt(a) + parseInt(b), 0) / body.presentation.length;

      let quiz = average_quiz * (assessment.course.bobot_quiz / 100);
      let practice_or_project = average_practice_or_project * (assessment.course.bobot_practice_or_project / 100);
      let assignment = average_assignment * (assessment.course.bobot_assignment / 100);
      let mid_exam = average_mid_exam * (assessment.course.bobot_mid_exam / 100);
      let final_exam = average_final_exam * (assessment.course.bobot_final_exam / 100);
      let presentation = average_presentation * (assessment.course.bobot_presentation / 100);

      let total = quiz + practice_or_project + assignment + mid_exam + final_exam + presentation;

      total = Math.round(total);
      req.body.nilai_akhir = total;

      next();
    } catch (error) {
      return InternalServerError(res, error, "Something went wrong!, in Middleware");
    }
  },
};
