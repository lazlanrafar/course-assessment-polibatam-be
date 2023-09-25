const { GetRubrikByIdProgramStudi, CreateRubrik } = require("./rubrik.Controller");

const express = require("express");
const router = express.Router();

router.get("/program-studi/:id_program_studi", GetRubrikByIdProgramStudi);

router.post("/", CreateRubrik);

module.exports = router;
