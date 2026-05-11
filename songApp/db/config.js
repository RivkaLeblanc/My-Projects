const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("coneccted to MongoDB"))
.catch(err => console.log("Error connecting to MongoDB:", err));
