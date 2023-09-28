const { FetchCourseLearningOutcomeDetailByIdCourse } = require("../app/course/course.Repository");

module.exports = {
  GetPerformanceIndicator: async (id_course) => {
    try {
      const CLO = await FetchCourseLearningOutcomeDetailByIdCourse(id_course);

      let performance_indicator = [];
      for (const iterator of CLO) {
        // push when rubrik.code not exist in performance_indicator
        if (performance_indicator.findIndex((item) => item.code === iterator.rubrik.code) === -1) {
          performance_indicator.push({
            code: iterator.rubrik.code,
            title: iterator.rubrik.title,
            label: `${iterator.rubrik.code}. ${iterator.rubrik.title}`,
            student_outcome: iterator.rubrik.student_outcome.code,
            cdio_syllabus: iterator.rubrik.cdio_syllabus.level,
          });
        }
      }

      //   order by code
      performance_indicator.sort((a, b) => {
        if (a.code < b.code) {
          return -1;
        }
        if (a.code > b.code) {
          return 1;
        }
        return 0;
      });

      return performance_indicator;
    } catch (error) {
      new Error(error);
    }
  },
};
