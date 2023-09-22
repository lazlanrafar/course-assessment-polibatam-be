const { GetProgramStudi, GetJurusan, CreateProgramStudi, GetProgramStudiById } = require("./program-studi.Controller");

const express = require("express");
const router = express.Router();

router.get("/jurusan", GetJurusan);

router.get("/", GetProgramStudi);
router.get("/:id", GetProgramStudiById);

router.post("/", CreateProgramStudi);

module.exports = router;
