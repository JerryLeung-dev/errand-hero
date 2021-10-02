const express = require('express');
const customerController = require('../controllers/customer.controller');

const router = express.Router();

router
  .route('/')
  .get(customerController.aliasCustomerList, customerController.getAllCustomers)
  .post(customerController.addCustomer);

// router
//   .route('/:id')
//   .get(customerController.aliasCustomerPurchase, customerController.getCustomer)
//   .patch(customerController.updatePurchaseList)
//   .delete(customerController.deleteCustomer);

router
  .route('/:slug')
  .get(customerController.getCustomerBySlug)
  .patch(customerController.updatePurchaseListBySlug)
  .delete(customerController.deleteCustomerBySlug);
module.exports = router;
