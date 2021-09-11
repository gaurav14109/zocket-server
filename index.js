const express = require('express')
const app = express()
const db = require('./config/mysql')
const bodyParser = require('body-parser')
const userRouter = require('./routes/user')
const cors = require('cors')
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json()) 

app.use('/api/users',userRouter)

app.listen(PORT, (err) => {

    if (err) {}
    console.log(`$port`)

})