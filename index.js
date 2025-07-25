const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
require('dotenv').config();

// middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const req = require('express/lib/request');
const { default: axios } = require('axios');
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



    const testimonialCollection = client.db('portfolio').collection('testimonials');

    const projectCollection = client.db('portfolio').collection('projects');
    const skillCollection = client.db('portfolio').collection('skills');
    const skillRelatedProjectCollection = client.db('portfolio').collection('skillRelatedProjects');
    const stackOverflowCollection = client.db('portfolio').collection('stackOverflows');
    const topProjectCollection = client.db('portfolio').collection('topProjects');
    const paymentCollection = client.db('portfolio').collection('payments');

    // 1. Service api 

    app.post('/service', async (req, res) => {
      const data = req.body;
      // console.log(data);
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

    app.get('/project_by_service/:service_id', async (req, res) => {
      const id = req.params.service_id;
      const query = { service_id: id };
      const result = await projectCollection.find(query).toArray();
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
      const query = { _id: new ObjectId(id) };
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

    // 3. project api 
    app.post('/project', async (req, res) => {
      const data = req.body;
      const result = await projectCollection.insertOne(data);
      res.send(result);
    })

    app.get('/project', async (req, res) => {
      const result = await projectCollection.find().toArray();
      res.send(result);
    })

    app.get('/project/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await projectCollection.findOne(query);
      res.send(result);
    })

    app.put('/project/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }
      const result = await projectCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })

    app.delete('/project/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await projectCollection.deleteOne(query);
      res.send(result);
    })

    // 4. skills api 
    app.post('/skills', async (req, res) => {
      const data = req.body;
      const result = await skillCollection.insertOne(data);
      res.send(result);
    })

    app.get('/skills', async (req, res) => {
      const result = await skillCollection.find().toArray();
      res.send(result);
    })


    app.get('/skills/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await skillCollection.findOne(query);
      res.send(result);
    })

    app.put('/skills/:id', async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }

      const result = await skillCollection.updateOne(query, updatedInfo, options);
      res.send(result);

    })

    app.delete('/skills/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await skillCollection.deleteOne(query);
      res.send(result);
    })

    // 5. skill related projects api 
    app.post('/skill-project', async (req, res) => {
      const data = req.body;
      const result = await skillRelatedProjectCollection.insertOne(data);
      res.send(result);
    })

    app.get('/skill-project', async (req, res) => {
      const result = await skillRelatedProjectCollection.find().toArray();
      res.send(result);
    })

    app.get('/skill-project/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await skillRelatedProjectCollection.findOne(query);
      res.send(result);
    })


    app.put('/skill-project/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }

      const result = await skillRelatedProjectCollection.updateOne(query, updatedInfo, options);
      res.send(result)
    })

    app.delete('/skill-project/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await skillRelatedProjectCollection.deleteOne(query);
      res.send(result);
    })


    // 6. stack overflow related api 
    app.post('/stack-overflow', async (req, res) => {
      const data = req.body;
      const result = await stackOverflowCollection.insertOne(data);
      res.send(result);
    })

    app.get('/stack-overflow', async (req, res) => {
      const result = await stackOverflowCollection.find().toArray();
      res.send(result);
    })

    app.get('/stack-overflow/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await stackOverflowCollection.findOne(query);
      res.send(result);
    })

    app.put('/stack-overflow/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }

      const result = await stackOverflowCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })

    app.delete('/stack-overflow/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await stackOverflowCollection.deleteOne(query);
      res.send(result);
    })

    // 6. Top 5 projects 
    app.post('/top-project', async (req, res) => {
      const data = req.body;
      const result = await topProjectCollection.insertOne(data);
      res.send(result);
    })

    app.get('/top-project', async (req, res) => {
      const result = await topProjectCollection.find().toArray();
      res.send(result);
    })

    app.get('/top-project/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await topProjectCollection.findOne(query);
      res.send(result);
    })

    app.put('/top-project/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }

      const result = await topProjectCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })

    app.delete('/top-project/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await topProjectCollection.deleteOne(query);
      res.send(result);
    })


    // checkout related api

    app.post("/create-payment", async (req, res) => {

      const data = req.body;
      const trxId = new ObjectId().toString();

      const initiateData = {

        store_id: 'ashli67571beb67054',
        store_passwd: 'ashli67571beb67054@ssl',
        total_amount: data.amount,
        currency: 'BDT',
        tran_id: trxId,
        success_url: 'https://resume-server-2.vercel.app/success-payment',
        fail_url: 'https://resume-server-2.vercel.app/fail',
        cancel_url: 'https://resume-server-2.vercel.app/cancel',
        cus_name: ' Customer Name',
        cus_email: 'cust @yahoo.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        shipping_method: "NO",
        product_name: "laptop",
        product_category: "laptop",
        product_profile: "general",
        value_a: 'ref001_A',
        value_b: 'ref002_B',
        value_c: 'ref003_C',
        value_d: 'ref004_D',
        multi_card_name: 'mastercard, visacard, amexcard',



      }

      const response = await axios({
        method: "POST",
        url: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
        data: initiateData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });


      const saveData = {
        cus_name: "Dummy",
        paymentId: trxId,
        amount: data.amount,
        status: "Pending",
      }

      const save = await paymentCollection.insertOne(saveData);
      if (save) {
        res.send({
          paymentUrl: response.data.GatewayPageURL,
        });
      }


    })

    app.post('/success-payment', async (req, res) => {
      const successData = req.body;
      if (successData.status !== "VALID") {
        throw new Error("Unauthorized payment, Invalid payment");
      }

      const query = {
        paymentId: successData.tran_id
      }
      const update = {
        $set: {
          status: "Success",
        },
      }

      const updateData = await paymentCollection.updateOne(query, update);
      
      res.redirect("https://ashikurrahman-33fb8.web.app/success")
    })

    app.post("/fail", async (req, res) => {
      res.redirect("https://ashikurrahman-33fb8.web.app/fail")
    })

    app.post("/cancel", async (req, res) => {
      res.redirect("https://ashikurrahman-33fb8.web.app/cancel")
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