const { GetUnitPegawai } = require("./user-management.Controller");

const express = require("express");
const router = express.Router();

router.get("/unit", GetUnitPegawai);

module.exports = router;
