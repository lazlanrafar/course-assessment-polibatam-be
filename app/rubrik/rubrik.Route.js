const {
  GetRubrikByIdProgramStudi,
  CreateRubrik,
  GetRubrikById,
  EditRubrik,
  GetRubrikListByIdCourse,
  DeleteRubrik,
} = require("./rubrik.Controller");
const { CheckIsRubrikWasUsed } = require("./rubrik.Middleware");

const express = require("express");
const router = express.Router();

// Fetch rubrik by id course (Mata Kuliah)
router.get("/list-by-course/:id_course", GetRubrikListByIdCourse);

router.get("/", GetRubrikByIdProgramStudi);
router.get("/:id", GetRubrikById);
router.post("/", CreateRubrik);
router.put("/:id", EditRubrik);
router.delete("/:id", CheckIsRubrikWasUsed, DeleteRubrik);

module.exports = router;
