const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 3000;
const Travels = require('./dbHelpers')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors')
app.use(cors({origin:"*"}))

//IMPORT ROUTERS

const usersRouter = require('./routes/users-routes')
const destinationsRouter = require('./routes/destinations-routes')

// ACTIVE(USE) ROUTES
app.use('/',usersRouter)
app.use('/',destinationsRouter)



//WELCOME PAGE
app.get('/',(req,res)=>{
    res.status(200).json({message:"Welcome to the server"})
})

app.listen(port,()=>{
    console.log(`Server running at port ${port}`)
})


