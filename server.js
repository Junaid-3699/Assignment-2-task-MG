//Deployment Links - https://taskmanager-junaidmehroz3.b4a.run/
//for users - https://taskmanager-junaidmehroz3.b4a.run/users (get)
//          - https://taskmanager-junaidmehroz3.b4a.run/user-data (post)
//          - https://taskmanager-junaidmehroz3.b4a.run/users/:id (put and delete)
// Same for Tasks replace 'users' with 'tasks'

const mongoose = require('mongoose');
const express = require('express');
require('./db/mongoConn')
const User = require('./models/users')
const Task = require('./models/task')

const app = express();
app.use(express.json());
const port = process.env.PORT || 8000

app.get('/users', (req, res) => {
    User.find({})
        .then(users => res.send(users))
        .catch(err => res.status(500).send(err))
})

app.post('/user-data', (req, res) => {
    const user = new User(req.body)
    user.save()
        .then(() => res.status(201).send(user))
        .catch(err => res.status(400).send(err))
})

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, {new : true})
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err))
})

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err))
})

app.get('/tasks', async (req, res) => {
   try {
        const tasks = await Task.find({})
        if(!tasks) res.status(400).send()
        res.send(tasks)
   } catch (error) {
        res.status(500).send(error)
   }
})

app.post('/task-data', async (req, res) => {
    try {
        const task = await new Task(req.body)
        task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(404).send(error)
    }
})

app.put('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findByIdAndUpdate(id, req.body, { new : true })
        if(!task) res.status(404).send()
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.delete('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findByIdAndDelete(id)
        if(!task) res.status(404).send()
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})


app.listen(port, () => console.log(`Server is up on port ${port}`))