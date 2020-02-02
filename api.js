const express = require("express");
const router = express.Router();
const person = require("./person");
const tasks = require("./tasks");
const workshop = require("./workshop");


////////////   person   ////////////
router.get("/persons", (req, res)=>{
  person.find()
    .then((person) => {
        res.send(person);
    })
});

router.post("/persons", (req, res)=>{
  person.create(req.body)
    .then((pers) => {
        res.send(pers)
    })
});


router.put("/persons/:id", (req, res)=>{
  person.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(() => {
      kipbd.findOne({_id: req.params.id})
            .then((person) => {
                res.send(person);
            })
    })
});

router.delete("/persons/:id", (req, res)=>{
  person.deleteOne({_id: req.params.id})
    .then((person) => {
        res.send(person)
    })
});


////////////   tasks   ////////////

router.get("/tasks", (req, res)=>{
  tasks.find()
    .then((task) => {
        res.send(task)
    })
});

router.post("/tasks", (req, res)=>{
  tasks.create(req.body)
    .then((task) => {
        res.send(task)
    })
});

router.put("/tasks/:id", (req, res)=>{
  tasks.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(() => {
      kipbd.findOne({_id: req.params.id})
            .then((task) => {
                res.send(task);
            })
    })
});

router.delete("/tasks/:id", (req, res)=>{
  tasks.deleteOne({_id: req.params.id})
    .then((task) => {
        res.send(task)
    })
});

///////////// workshop ///////////

router.get("/workshops", (req, res)=>{
  workshop.find()
    .then((workshop) => {
        res.send(workshop)
    })
});

router.post("/workshops", (req, res)=>{
  workshop.create(req.body)
    .then((workshop) => {
        res.send(workshop)
    })
});



router.put("/workshops/:id", (req, res)=>{
  workshop.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(() => {
      kipbd.findOne({_id: req.params.id})
            .then((workshop) => {
                res.send(workshop);
            })
    })
});

router.delete("/workshops/:id", (req, res)=>{
  workshop.deleteOne({_id: req.params.id})
    .then((workshop) => {
        res.send(workshop)
    })
});

module.exports = router;