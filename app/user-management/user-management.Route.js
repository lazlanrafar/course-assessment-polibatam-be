const { GetUnitPegawai, GetPegawai } = require("./user-management.Controller");

const express = require("express");
const router = express.Router();

router.get("/unit", GetUnitPegawai);

router.get("/", GetPegawai);

module.exports = router;
