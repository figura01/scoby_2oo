var express = require("express");
var router = express.Router();
const Item = require("../models/Item");
// const uploader = require("../config/cloudinary");

router.post("/api/items", async (req, res, next) => {
  //   if (req.file) {
  //     req.body.image = req.file.path;
  //   }
  // console.log(req.body);
  // console.log(req.body.image);
  Item.create(req.body)
    .then((dbRes) => res.status(201).json(dbRes))
    .catch(res.status(500).json(error));
});

router.get("/api/items", (req, res, next) => {
  Item.find()
    .then((dbRes) => res.status(200).json(dbRes.data))
    .catch((error) => res.status(500).json(error));
});

router.get("/api/items/:id", (req, res, next) => {
  Item.findById(req.params.id)
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((error) => res.status(500).json(error));
});

router.patch("/api/items/:id", (req, res, next) => {
  Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((error) => res.status(500).json(error));
});

router.delete("/api/items/:id", async (req, res, next) => {
  Item.findByIdAndRemove(req.params.id)
    .then((dbRes) => res.sendStatus(204))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
