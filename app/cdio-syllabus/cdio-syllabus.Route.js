const { FormCDIOSyllabusMiddleware } = require("./cdio-syllabus.Middleware");
const {
  GetCDIOSyllabus,
  GetCDIOSyllabusParent,
  CreateCDIOSyllabus,
  GetCDIOSyllabusById,
  EditCDIOSyllabus,
} = require("./cdio-syllabus.Controller");

const express = require("express");
const router = express.Router();

router.get("/parent", GetCDIOSyllabusParent);

router.get("/", GetCDIOSyllabus);
router.get("/:id", GetCDIOSyllabusById);

router.post("/", FormCDIOSyllabusMiddleware, CreateCDIOSyllabus);

router.put("/:id", FormCDIOSyllabusMiddleware, EditCDIOSyllabus);

module.exports = router;
