import mongoose from 'mongoose';

const product = new mongoose.Schema({
	book_name : {type : String, required : true},
	book_image : {type : String, required : true},
	book_price : {type : Number, required : true},
	book_category : {type : String, required : true},
	book_writer : {type : String, required : true},
	publication_name : {type : String, required : true},
	number_of_pages : {type : String, required : true},
	book_description : {type : String, required : true}
});

const Product = mongoose.model("Product",product);
export default Product;