const { InternalServerError, Ok } = require("../../utils/http-response");
const {
  StoreCourse,
  FetchCourse,
  FetchCourseById,
  UpdateCourse,
  StoreCourseLearningOutcome,
  StoreCourseLearningOutcomeDetail,
} = require("./course.Repository");

module.exports = {
  GetCourse: async (req, res) => {
    try {
      const result = await FetchCourse();

      return Ok(res, result, "Successfully get course");
    } catch (error) {
      // console.log(error);
      return InternalServerError(res, error, "Failed to get course");
    }
  },
  GetCourseById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await FetchCourseById(id);

      result.course_learning_outcome.forEach((clo) => {
        clo.details.forEach((detail) => {
          detail.rubrik.label = `${detail.rubrik.cdio_syllabus.level}/${detail.rubrik.student_outcome.code}-${detail.rubrik.code}`;
          detail.rubrik.student_outcome = detail.rubrik.student_outcome.code;
          detail.rubrik.cdio_syllabus = detail.rubrik.cdio_syllabus.level;
        });
      });

      return Ok(res, result, "Successfully get course");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get course");
    }
  },
  CreateCourse: async (req, res) => {
    try {
      const body = req.body;

      await StoreCourse(body);

      return Ok(res, {}, "Course created successfully!");
    } catch (error) {
      return InternalServerError(res, error, "Something went wrong!");
    }
  },
  EditCourse: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;

      await UpdateCourse(id, body);

      return Ok(res, {}, "Course updated successfully!");
    } catch (error) {
      return InternalServerError(res, error, "Something went wrong!");
    }
  },
  // ==================================================================
  // Course Learning Outcomes
  // ==================================================================
  CreateCourseLearningOutcome: async (req, res) => {
    try {
      const body = req.body;

      const result = await StoreCourseLearningOutcome({
        id_course: body.id_course,
        id_assessment_method: body.id_assessment_method,
        code: body.code,
        title: body.title,
      });

      for (const iterator of body.rubrik) {
        await StoreCourseLearningOutcomeDetail({
          id_course_learning_outcome: result.id,
          id_rubrik: iterator.id,
        });
      }

      return Ok(res, {}, "Course learning outcome created successfully!");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Something went wrong!");
    }
  },
};
