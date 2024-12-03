const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const createError = require('http-errors');
const app = express();
const dotenv = require('dotenv').config();


const PlayerRouter = require('./Routes/Player.route');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// mongoose.connect(process.env.MONGODB_URI, {
//     dbName: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     pass: process.env.DB_PASS
// }).then(() => {
//     console.log('MongoDB HAS CONNECTED....');
// });

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/player', PlayerRouter);

app.use((req, res, next) =>{
    next(createError(404, "Not Found"));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});

app.listen(3000, () =>
    {
        console.log('server started on port 3000')
});