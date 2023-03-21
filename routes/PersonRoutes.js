const express = require("express");
const PersonController = require("../controllers/PersonController");
const router = express.Router();
console.log(router, "router_______");

//get all person
router.get("/", PersonController.getAllPerson);

//get single person
router.get("/:id", PersonController.getPerson);

//create person

router.post("/", PersonController.createPerson);

//update person

router.put("/:id", PersonController.updatePerson);

//delete person

router.delete("/:id", PersonController.deletePerson);

module.exports = { router };
