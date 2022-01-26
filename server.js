const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

const app = express();

// routes 

const usersRoutes = require('./routes/api/users');
const equipasRoutes = require('./routes/api/equipas');
const propostasRoutes = require('./routes/api/propostas');
const requisitosRoutes = require('./routes/api/requisitos');
const rolesRoutes = require('./routes/api/roles');
const projetosRoutes = require('./routes/api/projetos');

// bodyParser Middleware

app.use(express.json());


// Connect database

mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// use routes 

app.use('/api/users', usersRoutes);
app.use('/api/equipas', equipasRoutes);
app.use('/api/propostas', propostasRoutes);
app.use('/api/requisitos', requisitosRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/projetos', projetosRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server run at port ${PORT}`));