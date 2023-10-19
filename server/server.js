const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db')
const PORT = process.env.PORT

const app = express()

// connect database
connectDB();

// Init Middleware
app.use(express.json())

app.get('/', (req,res) => res.send('API running'))

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))