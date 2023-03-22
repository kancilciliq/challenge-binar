require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var swaggerUi = require('swagger-ui-express');
var swaggerJsdoc = require('swagger-jsdoc');

var app = express();

const router = require('./routes/routes')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs')

app.use('/', router)

//swagger
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Doumentation API',
            version: '1.0.0'
        }
    },
    apis: ['app.js']
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions))

//internal eror handling
app.use((err,req,res,next)=>{
    console.log(err);

    res.status(500).json({
        status: 'fail',
        error : err.message
    })
})

//404 handler
app.use((req,res,next)=>{
    res.status(404).json({
        status: 'fail',
        error: 'not found'
    })
})


module.exports = app;
