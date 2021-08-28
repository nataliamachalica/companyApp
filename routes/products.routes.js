// post.routes.js

const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/products.controllers');

router.get('/products', ProductController.getAll);
router.get('/products/random', ProductController.getRandom);
router.get('/products/:id', ProductController.getById);
router.get('/products', ProductController.postAll);
router.get('/products/:id', ProductController.putById);
router.get('/products/:id', ProductController.deleteById);

module.exports = router;
