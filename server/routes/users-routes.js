const express = require('express');
const router = express.Router();
const Travels = require('../dbHelpers')
const bcrypt = require('bcryptjs')



//GET ALL USERS
router.get('/users',(req,res)=>{
    Travels.getAllUsers()
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(error=>res.status(500).json(error))

})

//ADD  USER
router.post('/users/register',(req,res)=>{
    const credentials = req.body;
    const {username,password} = credentials;

    if(!(username && password)){
        return res.status(400).json({message:"username and password is required"})
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
            return res.status(400).json({message:"userame, already exsit"})
        }else{
            res.status(500).json(error)
        }
    })
})

//GET USER BY USERNAME
router.get('/users/:username',(req,res)=>{
    const username = req.params.username;
    Travels.findUserByUsername(username)
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(error=>res.status(500).json(error))
    })



//DELETE USER
router.delete('/users/:id', (req,res)=>{
    const id = req.params.id;
    Travels.removeUser(id)
    .then(count=>{
    if(count>0){
        res.status(200).json({message:"user is deleted"})
    }else{
    res.status(200).json({message:"no user with that id"})
}
})
.catch(error=>res.status(500).json(error))
})


//LOGIN WITH EXISTING USER
router.post('/users/login', (req,res)=>{

const username= req.body.username
const password= req.body.password

Travels.findUserByUserName(username, password)
.then(user=>{
    if(user && bcrypt.compareSync(password,user.password)){
        res.status(200).json(user)
    }else{
        res.status(400).json({message:"User with that password doesnt exsit"})
    }
   
})
.catch(error=>res.status(500).json(error))
})

module.exports = router; 