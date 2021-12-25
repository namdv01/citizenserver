const express = require('express');
const app = express();
const config = require('dotenv').config();
const mongoose = require('mongoose');
const route = require('./routes/index');
const cors = require('cors');
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.DB, () => {
    console.log('connect database success');
});

route(app);

app.listen(process.env.PORT || 5000, () => {
    console.log('server have open');
});