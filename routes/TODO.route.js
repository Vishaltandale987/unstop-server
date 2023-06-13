const express = require("express");
const { TODOModel } = require("../model/TODO.model");



const TODO_Route = express.Router();




//get all post from TODOModel
TODO_Route.get("/", async (req, res) => {
    try {
        const notes = await TODOModel.find();
        res.send(notes.reverse());
    } catch (error) {
        console.log(error)
    }

});





// search 

TODO_Route.get("/search/:q", async (req, res) => {
    const data = req.params.q;
  
    try {
      const user = await TODOModel.find(  { task: { $regex: data || "", $options: 'i' } },);
  
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });




TODO_Route.get('/', async (req, res) => {
    try {
        const seats = await TODOModel.find();
        res.json(seats.reverse());
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve seats' });
    }
});






  
// create todo

TODO_Route.post("/add", async (req, res) => {
    const newSeat = new TODOModel(req.body);
    try {
        const savedPost = await newSeat.save();
        res.status(200).json("Todo has been successfully created.")
    } catch (err) {
        res.status(500).json("Please try again.");
    }
});


// delete TODO by ID

TODO_Route.delete("/delete/:id", async (req, res) => {

    try {
        await TODOModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Post has been deleted");
    } catch (err) {
        return res.status(500).json(err);
    }

});

//make imp  jPx9pjcLMIHIqilEyUhDh7xO1dY5Mfb4

TODO_Route.put("/imp", async (req, res) => {

    const {seatid} = req.body;

    const update = { $set: { status: "available"} };

 
    try {
        const user = await TODOModel.findByIdAndUpdate(seatid, update);
        res.status(200).json("Booking Successfully cancel");
    } catch (err) {
        return res.status(500).json(err);
    }

});




TODO_Route.put("/:id", async (req, res) => {

    let post_id = req.params.id
    let obj = req.body
  
    // console.log(post_id, obj)
  
  
  
      try {
        const user = await TODOModel.findByIdAndUpdate(post_id, {
          $set: obj,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    
  
  
  });




module.exports = {
    TODO_Route
};