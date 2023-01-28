const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const colors = require('colors')

//Express Object
const app = express();

app.use(morgan('dev'));

app.use(express.json({}));
app.use(express.json({
  extended: true
}))

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use dotenv files
dotenv.config({
  path: './config/config.env'
});

connectDB();

//Routes
app.use('/api/todo/auth', require('./routes/user'));
app.use('/api/taskmanagement', require('./routes/taskmanagement'));
app.use('/api/member', require('./routes/member'));

//Port
const PORT = process.env.PORT || 8000;
app.listen(PORT,
  console.log(`Server running mode on port ${PORT}`.yellow.underline.bold));

