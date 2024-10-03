const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
require('dotenv').config();

// middlewares 
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.bpilnp1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    const serviceCollection = client.db('portfolio').collection('services');

    const projectCollection = client.db('portfolio').collection('projects');

    const testimonialCollection = client.db('portfolio').collection('testimonials');

    // 1. Service api 

    app.post('/service', async (req, res) => {
      const data = req.body;
      console.log(data);
      const result = await serviceCollection.insertOne(data);
      res.send(result);
    })

    app.get('/service', async (req, res) => {
      const services = await serviceCollection.find().toArray();
      res.send(services);
    })

    app.get('/service/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      res.send(result);
    })

    app.put('/service/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }
      const result = await serviceCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })

    app.delete('/service/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await serviceCollection.deleteOne(query);
      res.send(result);
    })

    // 2. Testimonial api

    app.post('/testimonial', async (req, res) => {
      const data = req.body;
      const result = await testimonialCollection.insertOne(data);
      res.send(result);
    })

    app.get('/testimonial', async (req, res) => {
      const result = await testimonialCollection.find().toArray();
      res.send(result);
    })

    app.get('/testimonial/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await testimonialCollection.findOne(query);
      res.send(result);
    })

    app.put('/testimonial/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id : new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }
      const result = await testimonialCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })

    app.delete('/testimonial/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await testimonialCollection.deleteOne(query);
      res.send(result);
    })


    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send('server is ok');
})

app.listen(port, () => {
  console.log('Server is running on : ', port);
})