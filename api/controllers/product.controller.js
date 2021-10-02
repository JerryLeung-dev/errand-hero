const Product = require('../models/product.model');
const APIFeatures = require('../utility/APIFeatures');

//middleware helps to retrieve all documents with limited fields to display
exports.aliasPurchase = async (req, res, next) => {
  //assume mock data wont exceeds 1000 documents
  req.query.limit = '1000';
  req.query.fields = 'name';
  next();
};
exports.getAllProducts = async (req, res) => {
  try {
    //Pagination
    const features = new APIFeatures(Product.find(), req.query)
      .paginate()
      .limitFields();
    const countPageFeature = new APIFeatures(Product.find()).count();
    //Execute query
    const products = await features.query;
    const totalItems = await countPageFeature.query;
    res.status(200).json({
      status: 'success',
      result: products.length,
      data: {
        currentPage: features.queryObj.pageNum,
        totalItems,
        pageSize: features.queryObj.limitNum,
        products
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};
