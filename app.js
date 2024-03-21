const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const userRoute = require('./routes/user_routes')
const categoryRoute = require('./routes/category_routes');
const productRoute = require('./routes/product_routes');
const cartRoute = require('./routes/cart_routes');
const orderRoute = require('./routes/order_routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

// Using Routes
const baseUrlPart = '/api/v1';
app.use(baseUrlPart + '/user', userRoute);
app.use(baseUrlPart + '/category', categoryRoute);
app.use(baseUrlPart + '/product', productRoute);
app.use(baseUrlPart + '/cart', cartRoute)
app.use(baseUrlPart + '/order', orderRoute)

module.exports = app;