const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
//Routers
const productRoute = require('./routes/product.route');
const customerRoute = require('./routes/customer.route');

const app = express();
app.use(cors());

//Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(compression());

app.use('/api/v1/products', productRoute);
app.use('/api/v1/customers', customerRoute);

const __currentPath = path.resolve();
if (process.env.NODE_ENV === 'production') {
  console.log(__dirname);
  app.use(express.static(path.join(__currentPath, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__currentPath, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Hello world');
  });
}

module.exports = app;
