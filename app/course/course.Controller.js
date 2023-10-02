const { InternalServerError, Ok } = require("../../utils/http-response");
const { GetPerformanceIndicator } = require("../../utils/utils-course");
const {
  StoreCourse,
  FetchCourse,
  FetchCourseById,
  UpdateCourse,
  StoreCourseLearningOutcome,
  StoreCourseLearningOutcomeDetail,
  FetchCourseLearningOutcomeById,
  UpdateCourseLearningOutcome,
  DestroyCourseLearningOutcomeDetailByIdCLO,
  DestroyCourseLearningOutcome,
  StoreCourseAssessmentPlan,
  DestroyCourseAssessmentPlanByIdCourse,
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
  GetCourseLearningOutcomeById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await FetchCourseLearningOutcomeById(id);

      let rubrik = [];
      result.details.forEach((detail) => {
        rubrik.push({
          id: detail.rubrik.id,
          code: detail.rubrik.code,
          label: `${detail.rubrik.cdio_syllabus.level}/${detail.rubrik.student_outcome.code}-${detail.rubrik.code}`,
          title: detail.rubrik.title,
        });
      });
      delete result.details;

      result.rubrik = rubrik;

      return Ok(res, result, "Successfully get course learning outcome");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get course learning outcome");
    }
  },
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
  EditCourseLearningOutcome: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;

      await UpdateCourseLearningOutcome(id, {
        id_assessment_method: body.id_assessment_method,
        code: body.code,
        title: body.title,
      });

      await DestroyCourseLearningOutcomeDetailByIdCLO(id);
      for (const iterator of body.rubrik) {
        await StoreCourseLearningOutcomeDetail({
          id_course_learning_outcome: id,
          id_rubrik: iterator.id,
        });
      }

      return Ok(res, {}, "Course learning outcome updated successfully!");
    } catch (error) {
      return InternalServerError(res, error, "Something went wrong!");
    }
  },
  DeleteCourseLearningOutcome: async (req, res) => {
    try {
      const { id } = req.params;

      await DestroyCourseLearningOutcomeDetailByIdCLO(id);
      await DestroyCourseLearningOutcome(id);

      return Ok(res, {}, "Course learning outcome deleted successfully!");
    } catch (error) {
      return InternalServerError(res, error, "Something went wrong!");
    }
  },
  // ==================================================================
  // Course Performance Indicator
  // ==================================================================
  GetPerformanceIndicator: async (req, res) => {
    try {
      const { id } = req.params;

      const course = await FetchCourseById(id);
      delete course.course_learning_outcome;
      const performance_indicator = await GetPerformanceIndicator(id);

      const payload = {
        ...course,
        performance_indicator,
      };

      return Ok(res, payload, "Successfully get performance indicator");
    } catch (error) {
      return InternalServerError(res, error, "Something went wrong!");
    }
  },
  // ==================================================================
  // Course Assessment Plan
  // ==================================================================
  GenerateCourseAssessmentPlan: async (req, res) => {
    try {
      const { id } = req.params;
      const performance_indicator = await GetPerformanceIndicator(id);

      await DestroyCourseAssessmentPlanByIdCourse(id);
      for (const iterator of performance_indicator) {
        await StoreCourseAssessmentPlan({
          id_course: id,
          id_rubrik: iterator.id,
          created_by: req.user.nik,
        });
      }

      return Ok(res, {}, "Successfully get performance indicator");
    } catch (error) {
      return InternalServerError(res, error, "Something went wrong!");
    }
  },
};
