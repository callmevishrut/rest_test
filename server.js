require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

//for server to accept json
//.use is for middleware
app.use(express.json());

const membersRouter = require('./routes/members');
app.use('/members', membersRouter);

app.listen(3000, () => console.log('Server for API service Started'));