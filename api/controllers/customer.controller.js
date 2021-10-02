const Customer = require('../models/customer.model');
const APIFeatures = require('../utility/APIFeatures');

exports.aliasCustomerPurchase = (req, res, next) => {
  req.query.fields = 'name,purchaseList';
  next();
};

//Hide customer purchase lists
exports.aliasCustomerList = (req, res, next) => {
  req.query.fields = '-purchaseList';
  next();
};
exports.getAllCustomers = async (req, res) => {
  try {
    const features = new APIFeatures(Customer.find(), req.query)
      .paginate()
      .limitFields();
    const countPageFeature = new APIFeatures(Customer.find()).count();
    //Execute query
    const customers = await features.query;
    const totalItems = await countPageFeature.query;
    res.status(200).json({
      status: 'success',
      result: customers.length,
      data: {
        currentPage: features.queryObj.pageNum,
        totalItems,
        pageSize: features.queryObj.limitNum,
        customers
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.addCustomer = async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        customer: newCustomer
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getCustomerBySlug = async (req, res) => {
  try {
    const customer = await Customer.findOne({ slug: { $eq: req.params.slug } });
    res.status(200).json({
      status: 'success',
      data: {
        customer
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updatePurchaseListBySlug = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { slug: { $eq: req.params.slug } },
      {
        $set: {
          purchaseList: req.body
        }
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: {
        customer
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteCustomerBySlug = async (req, res) => {
  try {
    await Customer.findOneAndDelete({ slug: { $eq: req.params.slug } });
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

// exports.getCustomer = async (req, res) => {
//   try {
//     const features = new APIFeatures(
//       Customer.findById(req.params.id),
//       req.query
//     ).limitFields();
//     const customer = await features.query;
//     res.status(200).json({
//       status: 'success',
//       data: {
//         customer
//       }
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err
//     });
//   }
// };

// exports.updatePurchaseList = async (req, res) => {
//   try {
//     const customer = await Customer.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           purchaseList: req.body
//         }
//       },
//       { new: true, runValidators: true }
//     );

//     res.status(200).json({
//       status: 'success',
//       data: {
//         customer
//       }
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err
//     });
//   }
// };

// exports.deleteCustomer = async (req, res) => {
//   try {
//     await Customer.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//       status: 'success',
//       data: null
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err
//     });
//   }
// };
