const { FormCDIOSyllabusMiddleware, CheckIsCDIOSyllabusWasUsed } = require("./cdio-syllabus.Middleware");
const {
  GetCDIOSyllabus,
  GetCDIOSyllabusParent,
  CreateCDIOSyllabus,
  GetCDIOSyllabusById,
  EditCDIOSyllabus,
  DeleteCDIOSyllabus,
} = require("./cdio-syllabus.Controller");

const express = require("express");
const router = express.Router();

router.get("/parent", GetCDIOSyllabusParent);

router.get("/", GetCDIOSyllabus);
router.get("/:id", GetCDIOSyllabusById);
router.post("/", FormCDIOSyllabusMiddleware, CreateCDIOSyllabus);
router.put("/:id", FormCDIOSyllabusMiddleware, EditCDIOSyllabus);
router.delete("/:id", CheckIsCDIOSyllabusWasUsed, DeleteCDIOSyllabus);

module.exports = router;
