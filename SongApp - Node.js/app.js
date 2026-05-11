const express = require('express');
require('dotenv').config();
const songRouter = require('./routers/songRouter');
const authRouter = require('./routers/signUpRouter');
const cookieParser = require('cookie-parser');
require('./db/config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use("/songs", songRouter);
app.use("/", authRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port " + (process.env.PORT || 3000));
});

