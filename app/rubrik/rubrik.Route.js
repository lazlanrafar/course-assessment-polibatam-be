const { GetRubrikByIdProgramStudi, CreateRubrik, GetRubrikById, EditRubrik } = require("./rubrik.Controller");

const express = require("express");
const router = express.Router();

router.get("/program-studi/:id_program_studi", GetRubrikByIdProgramStudi);
router.get("/:id", GetRubrikById);

router.post("/", CreateRubrik);

router.put("/:id", EditRubrik);

module.exports = router;
