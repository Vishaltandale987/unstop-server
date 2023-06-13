const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");

require("dotenv").config();

const { Seat_Route } = require("./routes/Seat.route");
const { TODO_Route } = require("./routes/TODO.route");

let app = express();
app.use(express.json());
app.use(cors());





app.use("/seat", Seat_Route);
app.use("/todo", TODO_Route);










//get


app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the db");
  } catch (error) {
    console.log(error);
  }
  console.log(`server running on ${process.env.port} `);
});
