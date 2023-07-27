const express = require('express');
const cors = require('cors')
const app = express()
require('dotenv').config()
const {errorMiddleware} = require('./middlewares/errorMiddleware');
const { connectionToDB } = require('./db/connection');
const {authRouter} = require('./routers/authRouter');
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)
app.use(errorMiddleware)

const start = async () => {
    try {
        app.listen(PORT, () => { console.log(`Server work at port ${PORT}`) })
        await connectionToDB()
    } catch (err) {
        console.log(err);
    }
}

start()