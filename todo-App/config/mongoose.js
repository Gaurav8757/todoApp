// require the library
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/dbTodo',{
    useNewUrlParser: true,
  useUnifiedTopology: true,
});

// aquire the connection (to check if it is successful)
const db = mongoose.connection;

// up and running then print the message
db.on('open', ()=>{
    console.log('Connected to Database');
});

// exporting the database
module.exports = db;