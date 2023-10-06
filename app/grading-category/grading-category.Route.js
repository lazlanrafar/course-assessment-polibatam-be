const { GetGrading } = require("./grading-category.Controller");

const express = require("express");
const router = express.Router();

router.get("/list", GetGrading);

module.exports = router;
