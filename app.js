require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const https = require('https');
const _ = require('lodash');
const mongoose = require('mongoose');
const app = express();
const uniqueValidator = require('mongoose-unique-validator');
const alert = require('alert');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("app"));
app.set("view engine", "ejs");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/productsDB", {useNewUrlParser: true});


const productsSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String
  },
  size: {
    type: Number
  },
  height: {
    type: Number
  },
  width: {
    type: Number
  },
  length: {
    type: Number
  },
  weight: {
    type: Number
  }
});

productsSchema.plugin(uniqueValidator);

const Product = mongoose.model("Product", productsSchema);

app.get("/", function(req, res) {
  Product.find({}, function(err, foundProducts) {
    if (err) {
      console.log(err);
    } else {
      res.render("product-list", {
        products: foundProducts
      });
    }
  })

});

app.get("/addproduct", function(req, res) {
  res.render("product-add");
});

app.post("/addproduct", function(req, res) {
  const type = req.body.type;


  const product = new Product({
    sku: req.body.sku,
    name: req.body.name,
    price: req.body.price,
    type: type,
    weight: req.body.weight,
    size: req.body.size,
    height: req.body.height,
    width: req.body.width,
    length: req.body.length
  });

  product.save(function(err) {
    if (err) {
      console.log(err);
      alert('SKU should be unique!');
    } else {
      console.log("Successfully Added product");
      res.redirect("/")
    }
  });

})

app.post("/massdelete", function(req, res) {
  const array = req.body.deletecheckbox;

  Product.deleteMany({_id: array}, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  })
})







app.listen("3000", function(){
  console.log("Server is running on port 3000");
});
