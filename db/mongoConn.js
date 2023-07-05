const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:admin@tm-assign-2.yk57hsn.mongodb.net/taskMgDB', { useUnifiedTopology: true, useNewUrlParser : true })
    .catch(err => {
        console.log(err);
    })


const db = mongoose.connection
db.on("error", () => console.log('error'))
db.once("open", () => console.log("Connected Successfully"))