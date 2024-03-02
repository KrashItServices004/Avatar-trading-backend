const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const dotenv = require("dotenv").config()
const cors = require('cors')
const path=require('path')
const fileUpload = require('express-fileupload')



const errorMiddleware = require('./middleware/error')

// config
// dotenv.config({ path: "backend/config/config.env" });


// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser())
// app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())


app.use(express.json())
const _dirname=path.dirname("")
const buildpath=path.join(_dirname,"../client/dist")

app.use(express.static(buildpath))





app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);



// routes import 
// const productroutes = require('./routes/productRoutes')
const userroutes = require('./routes/userRoutes')
const homepageroutes = require('./routes/homepageRoutes')
const categoryroutes = require('./routes/categoryRoutes')
const productroutes = require('./routes/productRoutes')
const addressroutes = require('./routes/addressRoutes')
const cartroutes = require('./routes/cartRoutes')
const deliveryroutes = require('./routes/deliveryRoutes')
const popularProductroutes = require('./routes/popularProductRoutes')
const offerroutes = require('./routes/offerRoutes')
// const orderroutes = require('./routes/orderRoutes')
// const paymentroutes = require('./routes/paymentRoutes')

// app.use('/api/v1', productroutes);
app.use('/api/v1', userroutes);
app.use('/api/v1', homepageroutes);
app.use('/api/v1', categoryroutes);
app.use('/api/v1', productroutes);
app.use('/api/v1', addressroutes);
app.use('/api/v1', cartroutes);
app.use('/api/v1', deliveryroutes);
app.use('/api/v1', popularProductroutes);
app.use('/api/v1', offerroutes);
// app.use('/api/v1', orderroutes);
// app.use('/api/v1', paymentroutes);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });


// middleware for Error 
app.use(errorMiddleware)


module.exports = app