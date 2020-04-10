var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Collection products
var products = new Schema({
	"ProductID": Number,
      "ProductName": String,
      "SupplierID": Number,
      "CategoryID": Number,
      "QuantityPerUnit": String,
      "UnitPrice": Number,
      "UnitsInStock": Number,
      "UnitsOnOrder": Number,
      "ReorderLevel": Number,
      "Discontinued": Boolean,
      "Order_Details":[]
}, { collection: 'products' });
exports.products = mongoose.model('products' , products);

