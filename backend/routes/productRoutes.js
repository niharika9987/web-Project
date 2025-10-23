import express from 'express';
const router = express.Router();

// temporary test data
const products = [
  { _id: 1, name: 'Red Rose Bouquet', price: 499, image: 'https://via.placeholder.com/200' },
  { _id: 2, name: 'Lily Basket', price: 699, image: 'https://via.placeholder.com/200' },
  { _id: 3, name: 'Orchid Vase', price: 899, image: 'https://via.placeholder.com/200' },
];

// Route: GET /api/products
// GET /api/products/:id
router.get("/:id", (req, res) => {
  const product = products.find((p) => p._id.toString() === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});


export default router;
