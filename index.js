const express = require('express')
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h5fiw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db("merchStore").collection("products");
  console.log('connected')

  app.post('/addProduct',(req,res)=>{
    const product = req.body;
    console.log(product)
    productCollection.insertOne(product)
    .then( result =>{
      console.log(result);
    })
  })

  app.get('/products',(req,res)=>{
    productCollection.find()
    .toArray((err,documents)=>{
      res.send(documents);
    })
  })
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})