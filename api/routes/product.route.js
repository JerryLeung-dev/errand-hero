const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router
  .route('/name-list')
  .get(productController.aliasPurchase, productController.getAllProducts);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.addProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);
module.exports = router;
