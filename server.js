const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())

const users = {}

app.get('/users',  (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        // const user = { name: req.body.name, password: hashedPassword }
        // users.push(user)
        users[req.body.name] = hashedPassword        
        res.status(201).send()
    } catch {
        res.status(500).send()
    }

})

app.post('/users/login', async (req, res) => {
    const hpassword = users[req.body.name]
    //const user = users.find(user => user.name = req.body.name)
    if (hpassword == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
      if  (await bcrypt.compare(req.body.password, hpassword)) {
          res.send('Success')
      } else {
          res.send('Not Allowed')
      }
    } catch {
        res.status(500).send()
    }
})

app.listen(3000)