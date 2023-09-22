const { GetRubrik } = require("./rubrik.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetRubrik);

module.exports = router;
