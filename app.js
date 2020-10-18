const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./API/routes/products');
const orderRoutes = require('./API/routes/orders');
const userRoutes = require('./API/routes/users');
const importRoutes = require('./API/routes/import');
const saleRoutes = require('./API/routes/sales');
const creditRoutes = require('./API/routes/credit');
const receiptRoutes = require('./API/routes/receipt');

// console.log('ENVIRONMENT VARIABLE');
// console.log(process.env.MONGO_ATLAS_PW);
mongoose.connect( 'ADD YOUR DATABASE CONNECTION STRING');
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/upload', express.static('upload'))

app.use((req, res, next)=>{
   res.header('Access-Control-Allow-Origin', ' http://localhost:4200');
   res.header("Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");
   if(req.method === 'OPTIONS'){
       res.header('Access-Control-Allow-Method', 'PUT, POST, GET, DELETE, PATCH');
       return res.status(200).json({});
   }
   next();
});
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);
app.use('/import', importRoutes);
app.use('/sale', saleRoutes);
app.use('/credit', creditRoutes);
app.use('/receipt', receiptRoutes);


app.use((req, res, next)=>{
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;