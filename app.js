const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Set EJS as the template engine
app.set('view engine', 'ejs');

// MongoDB session store
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

// Configure sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store
}));

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRoutes');
const toursRouter = require('./routes/tourRoutes');
const profileRouter = require('./routes/profileRoutes');

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', toursRouter);
app.use('/', profileRouter);

module.exports = app;
