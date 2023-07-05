const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    desc : String,
    done : {
        type : Boolean,
        default : false
    }
})

const Task = mongoose.model("Task", TaskSchema)

module.exports = Task