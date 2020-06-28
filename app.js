const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();


// Configure mongoose to connect MongoDB
mongoose.connect('mongodb://localhost:27017/cms_app', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(res => {console.log('MongoDB Connected Successfully...')})
    .catch(err => {console.log('Database connection error...')})


// Setup View Engine To Use Handlebars
app.engine('handlebars', hbs({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');


// Configure express
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', (req, res) => {res.send('Welcome to the CMS app')});





const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT} ....`));