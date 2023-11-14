const {
  GetProgramStudi,
  GetJurusan,
  CreateProgramStudi,
  GetProgramStudiById,
  EditProgramStudi,
  GetProgramStudiList,
} = require("./program-studi.Controller");

const express = require("express");
const router = express.Router();

router.get("/list", GetProgramStudiList);
router.get("/", GetProgramStudi);
router.get("/:id", GetProgramStudiById);
router.post("/", CreateProgramStudi);
router.put("/:id", EditProgramStudi);

module.exports = router;
