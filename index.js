import express from 'express';
const app = express();
const port = process.env.PORT || 5000;
import cors from 'cors';
import {connectDB} from './db.js';
import Product from "./models/product.model.js";



app.use(express.json());
app.use(cors());


app.use((req, res, next) => { 
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
}); // CORS middle-ware



app.get('/', (req, res) => {
  res.status(200).json({
    message : "home page"
  });
});

// ---------------------------------------------------------------------------------------GET----------------------------------------------------------------------------------------

app.get('/api/products',(req,res)=>{
  Product.find()
  .then(result=>{
    res.status(200).json(result);
  })
  .catch(err=>{
    res.status(404).json({message : err.message});
  })
});


// ---------------------------------------------------------------------------------------POST----------------------------------------------------------------------------------------

app.post('/api/products',(req,res)=>{
  const new_product = req.body;
  const new_book = Product(new_product);

  try {   
    new_book.save();

    res.status(201).json({
      message : "successfully added a new book to the database",
      product : new_book           
    });

  }catch(err) {
    res.status(404).json({
      message : err.message
    });
  }

});

// ---------------------------------------------------------------------------------------DELETE----------------------------------------------------------------------------------------

app.delete('/api/products/:id',(req,res)=>{
  const {id} = req.params;

  Product.findByIdAndDelete(id)
  .then(result=>{
    res.status(200).json({
      message : result
    });
  })
  .catch(err=>{
    res.status(404).json({
      message: err.message
    });
  })
});

// ---------------------------------------------------------------------------------------PATCH----------------------------------------------------------------------------------------

app.patch('/api/products/:id',(req,res)=>{
  const {id} = req.params;

  const updated_book = req.body;

  Product.findByIdAndUpdate(id,updated_book)
  .then(result=>{
    res.status(200).json({
      message: updated_book
    });
  })
  .catch(err=>{
    res.status(404).json({
      message: err.message
    });
  })
});

// ---------------------------------------------------------------------------------------GET (individual)----------------------------------------------------------------------------------

app.get('/api/products/:id',(req,res)=>{
  const {id} = req.params;

  Product.findById(id)
  .then(result=>{
    res.status(200).json({
      message : result
    });
  })
  .catch(err=>{
    if(err.name == 'CastError'){
     return res.status(404).json({
        message : "Book not found"
      });
    }
    res.status(404).json({
      message : err.message 
    });
  })
});





// ---------------------------------------------------------------------------------------Listner------------------------------------------------------------------------------------------


app.listen(port,()=>{
  connectDB();
  console.log(`surver is running on port -> https://localhost: ${port}`);
});