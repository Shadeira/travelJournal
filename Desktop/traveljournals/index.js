const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 9000;
const Travels = require('./dbHelpers')
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs/dist/bcrypt');
app.use(bodyParser.json());



//WELCOME PAGE
app.get('/',(req, res) =>{
res.status(200).json({message: "welcome to the server"})
})

//GET ALL USERS
app.get('/users',(req, res) =>{
    Travels.getAllUsers()
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(error=>res.status(500).json(error))

    })

//CREATE A NEW USER
app.post('/users/register', (req,res)=> {
 const credentials = req.body;
 const {username,password} = credentials;

 if(!(username && password)){
     return res.status(400).json({message:"username and password required"})
 }

//password
const hash = bcrypt.hashSync(credentials.password,12)
credentials.password = hash;


Travels.addUser(credentials)
.then(user=>{
    res.status(200).json(user)
})
.catch(error=>{
    if(error.errno===19){
     return res.status(400).json({message: "Username, already exists"})

}else {
    res.status(500).json(error)
}

})

})

 //GET A USER BY USERNAME
app.get('/users/:username',(req,res)=>{
    const username = req.params.username
    Travels.findUserByUsername(username)
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(error=>res.status(500).json(error))

})


//DELETE USER
app.delete('/users/:id',(req, res)=>{
    const id = req.params.id;
    Travels.removeUser(id) 
    .then(count=>{
        if (count>0){
            res.status(200).json({message: "User is deleted"})
        }else{
            res.status(404).json({message: "no user with that id"})
        }
})
.catch(error=>res.status(500).json(error))

})


// LOGIN WITH EXISTING USER
app.post('/users/login',(req,res)=>{
    
    const username = req.body.username;
    const password = req.body.password;


    Travels.findUserByUsername(username, password)
    .then(user =>{
        if(user && bcrypt.compareSync(password,user.password)){
            res.status(200).json(user)
    }else {
        res.status(400).json({message:" User with that password does not exsit"})
    }
    })
    .catch(error=>res.status(500).json(error))

})


//DESTINATIONS
app.get('/destinations',(req, res) =>{
    Travels.getAllDestinations()
    .then(destinations=>{
        res.status(200).json(destinations)
    })
    .catch(error=>{
        res.status(500).json({message:"cannot get destinations"})

    })
})

    // CREATE DESTINATIONS

    app.post('/users/:id/destinations',(req, res)=>{
        const {id}= req.params;
        const newDestination = req.body;
        if(!newDestination.user_id){
        newDestination["user_id"] = parseInt(id,10)
        }
//find user and send back for destinations
Travels.findUserById(id)
.then(user =>{
    if(!user){
        res.status(404).json({message:"user does not exsit"})
    }
        if(!newDestination.title|| !newDestination.description){
            res.status(404).json({message:"All fileds must be completed"})
        }
            Travels.addDestination(newDestination, id)
            .then(destination=>{
                res.status(200).json(destination)
              })
              .catch(error=>{
                res.status(500).json({message:"server failed"})
              })
    })
})


//DELETE DESTINATIONS
app.delete('/destinations/:id',(req, res)=>{
    const {id} = req.params
    Travels.removeDestination(id) 
    .then(count=>{
        if (count>0){
            res.status(200).json({message: "Destination is deleted"})
        }else{
            res.status(404).json({message: "no destination with that id"})
        }
})
.catch(error=>res.status(500).json(error))

})

//UPDATE
app.patch("/destinations/:id",(req,res)=>{
    const {id}=req.params;
    Travels.updateDestination(id,req.body)
    .then(destination=>{
      res.status(200).json({message:"destination updated"})
    })
    .catch(error=>{
      res.status(500).json(error)})
  })

//
  app.get('/destinations/:id',(req,res)=>{
    const {id}=req.params
     Travels.findDestinationById(id)
     .then(destination=>{
       if(destination){
         res.status(200).json(destination)
       } else{
         res.status(404).json({message:"destination does not exist"})
       }
       
     })
     .catch(error=>{
       res.status(500).json(error)
     })
   })
  
  
  //GROUP BY
  
  app.get('/destinationNumbers',(req,res)=>{
    Travels.groupDestinations()
    .then(destination=>{
      res.status(200).json(destination)
    })
    .catch(error=>{
      res.status(500).json(error)})
  })
  


app.listen(port,()=>{
    console.log(`server running at ${port}`)
})
