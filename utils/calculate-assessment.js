const { FetchAssessmentById } = require("../app/assessment/assessment.Repository");
const { FetchCourseAssessmentPlanByIdCourse } = require("../app/course/course.Repository");
const { FetchGradingCategory } = require("../app/grading-category/grading-category.Repository");
const { FetchProficiencyLevelById } = require("../app/proficiency-level/proficiency-level.Repository");

const GetPercentageOfStudentsWithinEachCategory = async (id_assessment) => {
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
          if (
            student.practice_or_project[i] >= grading.lower_limit &&
            student.practice_or_project[i] <= grading.upper_limit
          ) {
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
        title: grading.title,
        quiz: grading.percentage_quiz,
        practice_or_project: grading.percentage_practice_or_project,
        assignment: grading.percentage_assignment,
        mid_exam: grading.percentage_mid_exam,
        final_exam: grading.percentage_final_exam,
        presentation: grading.percentage_presentation,
      });
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
};

const GetPercentageOfStudentWithinEachProficiencyLevel = async (id_assessment) => {
  try {
    const Assessment = await FetchAssessmentById(id_assessment);
    const ProficiencyLevel = await FetchProficiencyLevelById(Assessment.id_proficiency_level);

    let result = [];
    for (const grading of ProficiencyLevel.details) {
      let quiz = [...new Array(Assessment.course.total_quiz).fill(0)];
      let practice_or_project = [...new Array(Assessment.course.total_practice_or_project).fill(0)];
      let assignment = [...new Array(Assessment.course.total_assignment).fill(0)];
      let mid_exam = 0;
      let final_exam = 0;
      let presentation = [...new Array(Assessment.course.total_presentation).fill(0)];

      for (const student of Assessment.details) {
        for (let i = 0; i < student.quiz.length; i++) {
          if (student.quiz[i] >= grading.lower_limit && student.quiz[i] <= grading.upper_limit) {
            quiz[i] = quiz[i] + 1;
          }
        }

        for (let i = 0; i < student.practice_or_project.length; i++) {
          if (
            student.practice_or_project[i] >= grading.lower_limit &&
            student.practice_or_project[i] <= grading.upper_limit
          ) {
            practice_or_project[i] = practice_or_project[i] + 1;
          }
        }

        for (let i = 0; i < student.assignment.length; i++) {
          if (student.assignment[i] >= grading.lower_limit && student.assignment[i] <= grading.upper_limit) {
            assignment[i] = assignment[i] + 1;
          }
        }

        if (student.mid_exam >= grading.lower_limit && student.mid_exam <= grading.upper_limit) {
          mid_exam = mid_exam + 1;
        }

        if (student.final_exam >= grading.lower_limit && student.final_exam <= grading.upper_limit) {
          final_exam = final_exam + 1;
        }

        for (let i = 0; i < student.presentation.length; i++) {
          if (student.presentation[i] >= grading.lower_limit && student.presentation[i] <= grading.upper_limit) {
            presentation[i] = presentation[i] + 1;
          }
        }
      }

      let percentage_quiz = [...new Array(Assessment.course.total_quiz).fill(0)];
      let percentage_practice_or_project = [...new Array(Assessment.course.total_practice_or_project).fill(0)];
      let percentage_assignment = [...new Array(Assessment.course.total_assignment).fill(0)];
      let percentage_mid_exam = 0;
      let percentage_final_exam = 0;
      let percentage_presentation = [...new Array(Assessment.course.total_presentation).fill(0)];

      for (let i = 0; i < quiz.length; i++) {
        percentage_quiz[i] = Math.round((quiz[i] / Assessment.details.length) * 100);
      }

      for (let i = 0; i < practice_or_project.length; i++) {
        percentage_practice_or_project[i] = Math.round((practice_or_project[i] / Assessment.details.length) * 100);
      }

      for (let i = 0; i < assignment.length; i++) {
        percentage_assignment[i] = Math.round((assignment[i] / Assessment.details.length) * 100);
      }

      percentage_mid_exam = Math.round((mid_exam / Assessment.details.length) * 100);

      percentage_final_exam = Math.round((final_exam / Assessment.details.length) * 100);

      for (let i = 0; i < presentation.length; i++) {
        percentage_presentation[i] = Math.round((presentation[i] / Assessment.details.length) * 100);
      }

      result.push({
        level: grading.level,
        description: grading.description,
        quiz: percentage_quiz,
        practice_or_project: percentage_practice_or_project,
        assignment: percentage_assignment,
        mid_exam: percentage_mid_exam,
        final_exam: percentage_final_exam,
        presentation: percentage_presentation,
      });
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
};

const GetStudentProficiencyLevelAttainmentForEachAssessmentTool = async (id_assessment) => {
  try {
    const Assessment = await FetchAssessmentById(id_assessment);
    const ProficiencyLevel = await FetchProficiencyLevelById(Assessment.id_proficiency_level);

    let result = [];
    for (const student of Assessment.details) {
      let student_quiz = [new Array(Assessment.course.total_quiz).fill(0)];
      let student_practice_or_project = [new Array(Assessment.course.total_practice_or_project).fill(0)];
      let student_assignment = [new Array(Assessment.course.total_assignment).fill(0)];
      let student_mid_exam = 0;
      let student_final_exam = 0;
      let student_presentation = [new Array(Assessment.course.total_presentation).fill(0)];

      for (let i = 0; i < student.quiz.length; i++) {
        for (let j = 0; j < ProficiencyLevel.details.length; j++) {
          if (
            student.quiz[i] >= ProficiencyLevel.details[j].lower_limit &&
            student.quiz[i] <= ProficiencyLevel.details[j].upper_limit
          ) {
            student_quiz[i] = ProficiencyLevel.details[j].level;
          }
        }
      }

      for (let i = 0; i < student.practice_or_project.length; i++) {
        for (let j = 0; j < ProficiencyLevel.details.length; j++) {
          if (
            student.practice_or_project[i] >= ProficiencyLevel.details[j].lower_limit &&
            student.practice_or_project[i] <= ProficiencyLevel.details[j].upper_limit
          ) {
            student_practice_or_project[i] = ProficiencyLevel.details[j].level;
          }
        }
      }

      for (let i = 0; i < student.assignment.length; i++) {
        for (let j = 0; j < ProficiencyLevel.details.length; j++) {
          if (
            student.assignment[i] >= ProficiencyLevel.details[j].lower_limit &&
            student.assignment[i] <= ProficiencyLevel.details[j].upper_limit
          ) {
            student_assignment[i] = ProficiencyLevel.details[j].level;
          }
        }
      }

      for (let j = 0; j < ProficiencyLevel.details.length; j++) {
        if (
          student.mid_exam >= ProficiencyLevel.details[j].lower_limit &&
          student.mid_exam <= ProficiencyLevel.details[j].upper_limit
        ) {
          student_mid_exam = ProficiencyLevel.details[j].level;
        }
      }

      for (let j = 0; j < ProficiencyLevel.details.length; j++) {
        if (
          student.final_exam >= ProficiencyLevel.details[j].lower_limit &&
          student.final_exam <= ProficiencyLevel.details[j].upper_limit
        ) {
          student_final_exam = ProficiencyLevel.details[j].level;
        }
      }

      for (let i = 0; i < student.presentation.length; i++) {
        for (let j = 0; j < ProficiencyLevel.details.length; j++) {
          if (
            student.presentation[i] >= ProficiencyLevel.details[j].lower_limit &&
            student.presentation[i] <= ProficiencyLevel.details[j].upper_limit
          ) {
            student_presentation[i] = ProficiencyLevel.details[j].level;
          }
        }
      }

      result.push({
        nim: student.nim,
        name: student.name,
        quiz: student_quiz,
        practice_or_project: student_practice_or_project,
        assignment: student_assignment,
        mid_exam: student_mid_exam,
        final_exam: student_final_exam,
        presentation: student_presentation,
      });
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
};

const GetAttainmentOfEachPerformanceIndicator = async (id_assessment) => {
  try {
    const GradingCategory = await FetchGradingCategory();
    const Assessment = await FetchAssessmentById(id_assessment);
    const AssessmentPlan = await FetchCourseAssessmentPlanByIdCourse(Assessment.id_course);

    GradingCategory.forEach((category) => {
      let upper_limit = Math.max(...category.grading.map((grading) => grading.upper_limit));
      let lower_limit = Math.min(...category.grading.map((grading) => grading.lower_limit));

      category.upper_limit = upper_limit;
      category.lower_limit = lower_limit;

      delete category.grading;
    });

    let data = [];
    for (const SO_PI of AssessmentPlan) {
      let quiz = [];
      let practice_or_project = [];
      let assignment = [];
      let mid_exam = false;
      let final_exam = false;
      let presentation = [];

      const StartWith = (value, prefix, except) =>
        typeof value === "string" && value.startsWith(prefix) && !value.startsWith(except);

      if (Object.values(SO_PI).some((value) => StartWith(value, "A"))) {
        assignment.push(
          ...Object.values(SO_PI)
            .filter((value) => StartWith(value, "A"))
            .map((value) => value.replace("A", ""))
            .map((value) => parseInt(value))
        );
      }

      if (Object.values(SO_PI).some((value) => StartWith(value, "P", "PP"))) {
        practice_or_project.push(
          ...Object.values(SO_PI)
            .filter((value) => StartWith(value, "P", "PP"))
            .map((value) => value.replace("P", ""))
            .map((value) => parseInt(value))
        );
      }

      if (Object.values(SO_PI).some((value) => StartWith(value, "Q"))) {
        quiz.push(
          ...Object.values(SO_PI)
            .filter((value) => StartWith(value, "Q"))
            .map((value) => value.replace("Q", ""))
            .map((value) => parseInt(value))
        );
      }

      if (Object.values(SO_PI).some((value) => StartWith(value, "PP"))) {
        presentation.push(
          ...Object.values(SO_PI)
            .filter((value) => StartWith(value, "PP"))
            .map((value) => value.replace("PP", ""))
            .map((value) => parseInt(value))
        );
      }

      if (Object.values(SO_PI).some((value) => StartWith(value, "MSE"))) {
        mid_exam = true;
      }

      if (Object.values(SO_PI).some((value) => StartWith(value, "FSE"))) {
        final_exam = true;
      }

      data.push({
        so_pi: SO_PI.rubrik.student_outcome.code + "-" + SO_PI.rubrik.code,
        title: SO_PI.rubrik.title,
        quiz: quiz,
        practice_or_project: practice_or_project,
        assignment: assignment,
        mid_exam: mid_exam,
        final_exam: final_exam,
        presentation: presentation,
      });
    }

    const PERCENTAGE_WITHIN_EACH_CATEGORY = await GetPercentageOfStudentsWithinEachCategory(id_assessment);
    const PERCENTAGE_WITHIN_EACH_PROFICIENCY_LEVEL = await GetPercentageOfStudentWithinEachProficiencyLevel(
      id_assessment
    );

    let result = [];
    for (const item of data) {
      let category = [];
      let proficiency_level = [];

      for (const Step5 of PERCENTAGE_WITHIN_EACH_CATEGORY) {
        let length = 0;
        let total = 0;

        let quiz = [];
        if (item.quiz.length > 0) {
          for (const Q of item.quiz) {
            quiz.push({
              key: "Q" + Q,
              value: Step5.quiz[Q - 1],
            });

            length++;
            total += Step5.quiz[Q - 1];
          }
        }

        let practice_or_project = [];
        if (item.practice_or_project.length > 0) {
          for (const P of item.practice_or_project) {
            practice_or_project.push({
              key: "P" + P,
              value: Step5.practice_or_project[P - 1],
            });

            length++;
            total += Step5.practice_or_project[P - 1];
          }
        }

        let assignment = [];
        if (item.assignment.length > 0) {
          for (const A of item.assignment) {
            assignment.push({
              key: "A" + A,
              value: Step5.assignment[A - 1],
            });

            length++;
            total += Step5.assignment[A - 1];
          }
        }

        let mid_exam = 0;
        if (item.mid_exam) {
          mid_exam = Step5.mid_exam;

          length++;
          total += Step5.mid_exam;
        }

        let final_exam = 0;
        if (item.final_exam) {
          final_exam = Step5.final_exam;

          length++;
          total += Step5.final_exam;
        }

        let presentation = [];
        if (item.presentation.length > 0) {
          for (const PP of item.presentation) {
            presentation.push({
              key: "PP" + PP,
              value: Step5.presentation[PP - 1],
            });

            length++;
            total += Step5.presentation[PP - 1];
          }
        }

        let average = total / length;
        average = Math.round(average * 10) / 10;

        category.push({
          title: Step5.title,
          quiz: quiz,
          practice_or_project: practice_or_project,
          assignment: assignment,
          mid_exam: mid_exam ? mid_exam : 0,
          final_exam: final_exam ? final_exam : 0,
          presentation: presentation,
          average: average,
        });
      }

      for (const Step7 of PERCENTAGE_WITHIN_EACH_PROFICIENCY_LEVEL) {
        let length = 0;
        let total = 0;

        let quiz = [];
        if (item.quiz.length > 0) {
          for (const Q of item.quiz) {
            quiz.push({
              key: "Q" + Q,
              value: Step7.quiz[Q - 1],
            });

            length++;
            total += Step7.quiz[Q - 1];
          }
        }

        let practice_or_project = [];
        if (item.practice_or_project.length > 0) {
          for (const P of item.practice_or_project) {
            practice_or_project.push({
              key: "P" + P,
              value: Step7.practice_or_project[P - 1],
            });

            length++;
            total += Step7.practice_or_project[P - 1];
          }
        }

        let assignment = [];
        if (item.assignment.length > 0) {
          for (const A of item.assignment) {
            assignment.push({
              key: "A" + A,
              value: Step7.assignment[A - 1],
            });

            length++;
            total += Step7.assignment[A - 1];
          }
        }

        let mid_exam = 0;
        if (item.mid_exam) {
          mid_exam = Step7.mid_exam;

          length++;
          total += Step7.mid_exam;
        }

        let final_exam = 0;
        if (item.final_exam) {
          final_exam = Step7.final_exam;

          length++;
          total += Step7.final_exam;
        }

        let presentation = [];
        if (item.presentation.length > 0) {
          for (const PP of item.presentation) {
            presentation.push({
              key: "PP" + PP,
              value: Step7.presentation[PP - 1],
            });

            length++;
            total += Step7.presentation[PP - 1];
          }
        }

        let average = total / length;
        average = Math.round(average * 10) / 10;

        proficiency_level.push({
          level: Step7.level,
          description: Step7.description,
          quiz: quiz,
          practice_or_project: practice_or_project,
          assignment: assignment,
          mid_exam: mid_exam,
          final_exam: final_exam,
          presentation: presentation,
          average: average,
        });
      }

      for (const iterator of category) {
        if (item.quiz.length === 0) delete iterator.quiz;
        if (item.practice_or_project.length === 0) delete iterator.practice_or_project;
        if (item.assignment.length === 0) delete iterator.assignment;
        if (!item.mid_exam) delete iterator.mid_exam;
        if (!item.final_exam) delete iterator.final_exam;
        if (item.presentation.length === 0) delete iterator.presentation;
      }

      for (const iterator of proficiency_level) {
        if (item.quiz.length === 0) delete iterator.quiz;
        if (item.practice_or_project.length === 0) delete iterator.practice_or_project;
        if (item.assignment.length === 0) delete iterator.assignment;
        if (!item.mid_exam) delete iterator.mid_exam;
        if (!item.final_exam) delete iterator.final_exam;
        if (item.presentation.length === 0) delete iterator.presentation;
      }

      result.push({
        so_pi: item.so_pi,
        title: item.title,
        category: category,
        proficiency_level: proficiency_level,
      });
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
};

module.exports = {
  GetPercentageOfStudentsWithinEachCategory,
  GetPercentageOfStudentWithinEachProficiencyLevel,
  GetStudentProficiencyLevelAttainmentForEachAssessmentTool,
  GetAttainmentOfEachPerformanceIndicator,
};
