const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please Enter the product Name'],
        trim:true
    },
    description:{
        type:String,
        required:[true, 'Please Enter the Product Description']
    },
    shortdesc:{
        type:String,
        required:[true, 'Please Enter the Product short Description']
    },
    price:{
        type:Number,
     
    },
    weight:{
        type:Number,
        required:[true, 'Please Enter the Product weight'],
    },
    discount:{
        type:Number,
        required:[true, 'Please Enter the discount percentage'],
    },

    images:[
       {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
       }
    ],
    stripes:[
        {
         name:{
             type:String,
         },
         price:{
             type:String,
         },
         pic:{
             public_id:{
                 type:String,
             },
             url:{
                 type:String,
             }
            }
         ,
        }
     ],
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:true
    },
    subcategory:{
        type:mongoose.Schema.ObjectId,
        ref:'Subcategory',
        required:true
    },



    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);