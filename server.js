const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

const app = express();

// routes 

const usersRoutes = require('./routes/api/users');

// bodyParser Middleware

app.use(express.json());

// Connect database

mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// use routes 

app.use('/api/users', usersRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server run at port ${PORT}`));