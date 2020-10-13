var express = require("express");
var router = express.Router();
const Item = require("../models/Item");
const Contact = require("../models/Contact");
// const uploader = require("../config/cloudinary");

router.post("/api/items", async (req, res, next) => {
  try {
    const newItem = await Item.create(req.body);
    const newItemId = newItem._id;
    const reqBodyWithId = { ...req.body, item_id: newItemId };
    const newContact = await Contact.create(reqBodyWithId);
    res.status(200).json(newContact);
  } catch (error) {
    next(error);
  }
  // .then((dbRes) => res.status(201).json(dbRes))
  // .catch((error) => res.status(500).json(error));
  // .then((dbRes) => res.status(201).json(dbRes))
  // .catch((error) => res.status(500).json(error));
});

router.get("/api/items", (req, res, next) => {
  console.log("I'M HERE");
  Item.find()
    .then((dbRes) => {
      // console.log(dbRes);
      res.status(200).json(dbRes);
    })
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
