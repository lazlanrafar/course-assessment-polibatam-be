const { FormRubrikMiddleware } = require("./rubrik.Middleware");
const { GetRubrik, GetCDIOSyllabus, CreateRubrik, GetRubrikById, EditRubrik } = require("./rubrik.Controller");

const express = require("express");
const router = express.Router();

router.get("/cdio-syllabus", GetCDIOSyllabus);

router.get("/", GetRubrik);
router.get("/:id", GetRubrikById);

router.post("/", FormRubrikMiddleware, CreateRubrik);

router.put("/:id", FormRubrikMiddleware, EditRubrik);

module.exports = router;
