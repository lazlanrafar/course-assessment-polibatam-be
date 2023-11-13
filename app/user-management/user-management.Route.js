const {
  GetUnitPegawai,
  GetPegawai,
  GetPegawaiByNIP,
  CreatePegawaiAdmin,
  DeletePegawaiAdmin,
} = require("./user-management.Controller");

const express = require("express");
const { MiddlewareUserManagementCheckIsUserWasAdmin } = require("./user-management.Middleware");
const router = express.Router();

router.get("/unit", GetUnitPegawai);

router.get("/", GetPegawai);
router.get("/:nip", GetPegawaiByNIP);
router.post("/admin/:nip", MiddlewareUserManagementCheckIsUserWasAdmin, CreatePegawaiAdmin);
router.delete("/admin/:nip", DeletePegawaiAdmin);

module.exports = router;
