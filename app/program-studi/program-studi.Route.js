const { GetProgramStudi } = require("./program-studi.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetProgramStudi);

module.exports = router;
