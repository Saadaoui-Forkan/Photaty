const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db')
const PORT = process.env.PORT
const cors = require("cors") 

const app = express()

// connect database
connectDB();

// Init Middleware
app.use(express.json())
app.use(cors())

app.get('/', (req,res) => res.send('API running'))

// routes
app.use('/api/users', require('./routes/UserRoute'))
app.use('/api/images', require('./routes/imageRoute'))

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))