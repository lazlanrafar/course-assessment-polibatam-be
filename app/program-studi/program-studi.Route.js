const { GetProgramStudi, GetJurusan } = require("./program-studi.Controller");

const express = require("express");
const router = express.Router();

router.get("/jurusan", GetJurusan);

router.get("/", GetProgramStudi);

module.exports = router;
