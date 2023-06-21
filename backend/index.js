const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())

app.use(cors({
    origin:"*",
}))

app.use(express.urlencoded({extended: false}))
const port = process.env.port || 6080;
require('./DBconn/conn')

const route = require('./Routes/route')
app.use(route)

const basics = require('./Routes/basics')
app.use(basics)

const sample = require('./Routes/sample');
app.use(sample)

app.listen(port,()=>{
    console.log(`server running at port ${port} `);
})
app.set("view engine", "ejs");