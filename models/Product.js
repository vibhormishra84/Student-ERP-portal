const mongoose=require('mongoose');
const Review = require('./Review');
const productSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        trim: true
    },
    reviews: 
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review'
            }
        ],
    author:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
})
productSchema.post('findOneAndDelete',async function(product){
    if(product.reviews.length>0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})
let Product=mongoose.model('Product',productSchema);
module.exports=Product;
