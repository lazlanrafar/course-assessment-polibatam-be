const { GetUnitPegawai, GetPegawai, GetPegawaiByNIP } = require("./user-management.Controller");

const express = require("express");
const router = express.Router();

router.get("/unit", GetUnitPegawai);

router.get("/", GetPegawai);
router.get("/:nip", GetPegawaiByNIP);

module.exports = router;
