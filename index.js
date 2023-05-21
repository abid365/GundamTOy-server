const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middelewares
app.use(cors());
app.use(express.json());

/* 

 */

// mongodb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.arpztf9.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const toyCollection = client.db("toystore").collection("toys");

    // app.get("/toys", async (req, res) => {
    //   const cursor = toyCollection.find();
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });

    // adding toys

    app.post("/addtoys", async (req, res) => {
      const toy = req.body;
      const addedToy = await toyCollection.insertOne(toy);
      res.send(addedToy);
      // console.log(toy);
    });

    // finding single toy or toy details

    app.get("/toys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const toy = await toyCollection.findOne(query);
      res.send(toy);
    });

    // my toys
    app.get("/toys", async (req, res) => {
      console.log(req.query.SellerEmail);
      let query = {};
      if (req.query?.SellerEmail) {
        query = { SellerEmail: req.query.SellerEmail };
      }
      const mytoys = await toyCollection.find(query).toArray();
      res.send(mytoys);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// end of db

app.get("/", (req, res) => {
  res.send("Server Is Online");
});

app.listen(port, () => {
  console.log(`Server Is Running At Port: ${port}`);
});
