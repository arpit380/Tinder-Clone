import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Cards from "./dbCards.js";
import dbCards from "./dbCards.js";

//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://arpit:mongorawat@cluster0.uopcdpb.mongodb.net/tinderdb?retryWrites=true&w=majority`;

//To Connect server to mongo cloud database
mongoose
  .connect(connection_url)
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log("no connection"));

//Middleware
app.use(express.json());
app.use(Cors());

//DB Config
mongoose.connect(connection_url);

//API Endpoints
app.get("/", (req, res) => res.status(200).send("HELLO YOHOHO"));

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Listener
app.listen(port, () => console.log(`listening on local host: ${port}`));
