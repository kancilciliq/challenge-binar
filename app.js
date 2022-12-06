require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);

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
