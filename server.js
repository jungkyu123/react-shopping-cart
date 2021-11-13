const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Product = mongoose.model("products", new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    desc: String,
    image: String,
    price: Number,
    size: [String],
}))

app.get("/api/products", async (req, res) => {
    // giving no condition so it gives back everything back
    const products = await Product.find({});
    res.send(products);
});

app.post("/api/products", async(req, res) => {
    // This is to allow us to create a new product in our database
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

app.delete("/api/products/:id", async(req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));