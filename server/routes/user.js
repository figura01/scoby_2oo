const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");


router.patch("/me", (req, res, next) => {
    console.log("PATCH api/user/me");
});