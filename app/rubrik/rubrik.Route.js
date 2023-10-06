const {
  GetRubrikByIdProgramStudi,
  CreateRubrik,
  GetRubrikById,
  EditRubrik,
  GetRubrikListByIdCourse,
} = require("./rubrik.Controller");

const express = require("express");
const router = express.Router();

// Fetch rubrik by id course (Mata Kuliah)
router.get("/list-by-course/:id_course", GetRubrikListByIdCourse);

router.get("/", GetRubrikByIdProgramStudi);
router.get("/:id", GetRubrikById);
router.post("/", CreateRubrik);
router.put("/:id", EditRubrik);

module.exports = router;
