const { GetProgramStudi, GetJurusan, CreateProgramStudi } = require("./program-studi.Controller");

const express = require("express");
const router = express.Router();

router.get("/jurusan", GetJurusan);

router.get("/", GetProgramStudi);

router.post("/", CreateProgramStudi);

module.exports = router;
