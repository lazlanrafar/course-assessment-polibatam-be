const { FetchAssessmentById } = require("../app/assessment/assessment.Repository");
const { FetchGradingCategory } = require("../app/grading-category/grading-category.Repository");

module.exports = {
  GetPercentageOfStudentsWithinEachCategory: async (id_assessment) => {
    try {
      const GradingCategory = await FetchGradingCategory();
      const Assessment = await FetchAssessmentById(id_assessment);

      const TotalQuiz = Assessment.course.total_quiz;
      const TotalPracticeOrProject = Assessment.course.total_practice_or_project;
      const TotalAssignment = Assessment.course.total_assignment;
      const TotalMidExam = Assessment.course.total_mid_exam;
      const TotalFinalExam = Assessment.course.total_final_exam;
      const TotalPresentation = Assessment.course.total_presentation;

      const TotalStudent = Assessment.details.length;

      GradingCategory.forEach((category) => {
        let upper_limit = Math.max(...category.grading.map((grading) => grading.upper_limit));
        let lower_limit = Math.min(...category.grading.map((grading) => grading.lower_limit));

        category.upper_limit = upper_limit;
        category.lower_limit = lower_limit;

        delete category.grading;
      });

      let result = [];
      for (const grading of GradingCategory) {
        grading.quiz = [...new Array(TotalQuiz).fill(0)];
        grading.practice_or_project = [...new Array(TotalPracticeOrProject).fill(0)];
        grading.assignment = [...new Array(TotalAssignment).fill(0)];
        grading.mid_exam = 0;
        grading.final_exam = 0;
        grading.presentation = [...new Array(TotalPresentation).fill(0)];

        for (const student of Assessment.details) {
          for (let i = 0; i < student.quiz.length; i++) {
            if (student.quiz[i] >= grading.lower_limit && student.quiz[i] <= grading.upper_limit) {
              grading.quiz[i] = grading.quiz[i] + 1;
            }
          }
        }

        for (const student of Assessment.details) {
          for (let i = 0; i < student.practice_or_project.length; i++) {
            if (student.practice_or_project[i] >= grading.lower_limit && student.practice_or_project[i] <= grading.upper_limit) {
              grading.practice_or_project[i] = grading.practice_or_project[i] + 1;
            }
          }
        }

        for (const student of Assessment.details) {
          for (let i = 0; i < student.assignment.length; i++) {
            if (student.assignment[i] >= grading.lower_limit && student.assignment[i] <= grading.upper_limit) {
              grading.assignment[i] = grading.assignment[i] + 1;
            }
          }
        }

        for (const student of Assessment.details) {
          if (student.mid_exam >= grading.lower_limit && student.mid_exam <= grading.upper_limit) {
            grading.mid_exam = grading.mid_exam + 1;
          }
        }

        for (const student of Assessment.details) {
          if (student.final_exam >= grading.lower_limit && student.final_exam <= grading.upper_limit) {
            grading.final_exam = grading.final_exam + 1;
          }
        }

        for (const student of Assessment.details) {
          for (let i = 0; i < student.presentation.length; i++) {
            if (student.presentation[i] >= grading.lower_limit && student.presentation[i] <= grading.upper_limit) {
              grading.presentation[i] = grading.presentation[i] + 1;
            }
          }
        }

        grading.percentage_quiz = [...new Array(TotalQuiz).fill(0)];
        grading.percentage_practice_or_project = [...new Array(TotalPracticeOrProject).fill(0)];
        grading.percentage_assignment = [...new Array(TotalAssignment).fill(0)];
        grading.percentage_mid_exam = [...new Array(TotalMidExam).fill(0)];
        grading.percentage_final_exam = [...new Array(TotalFinalExam).fill(0)];
        grading.percentage_presentation = [...new Array(TotalPresentation).fill(0)];

        for (let i = 0; i < grading.quiz.length; i++) {
          grading.percentage_quiz[i] = Math.round((grading.quiz[i] / TotalStudent) * 100);
        }

        for (let i = 0; i < grading.practice_or_project.length; i++) {
          grading.percentage_practice_or_project[i] = Math.round((grading.practice_or_project[i] / TotalStudent) * 100);
        }

        for (let i = 0; i < grading.assignment.length; i++) {
          grading.percentage_assignment[i] = Math.round((grading.assignment[i] / TotalStudent) * 100);
        }

        grading.percentage_mid_exam = Math.round((grading.mid_exam / TotalStudent) * 100);

        grading.percentage_final_exam = Math.round((grading.final_exam / TotalStudent) * 100);

        for (let i = 0; i < grading.presentation.length; i++) {
          grading.percentage_presentation[i] = Math.round((grading.presentation[i] / TotalStudent) * 100);
        }

        result.push({
          ...grading,
        });
      }

      return result;
    } catch (error) {
      new Error(error);
    }
  },
};
