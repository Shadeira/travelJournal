const express = require('express');
const router = express.Router();
const Travels = require('../dbHelpers')



//DESTINATIONS
router.get('/destinations',(req,res)=>{
    Travels.getAllDestinations()
    .then(destinations=>{
        res.status(200).json(destinations)
    })
    
    .catch(error=>{
        res.status(500).json({message:"cannot get destinations"})
    })
    })
    
    //CREATE DESTINATIONS
    router.post('/users/:id/destinations',(req,res)=>{
        const {id} = req.params;
        const newDestination = req.body;
        if(!newDestination.user_id){
        newDestination["user_id"]=parseInt(id,10)
        }
    
    
        //find user and send back for destinations
        Travels.findUserById(id)
        .then(user=>{
            if(!user){
                res.status(404).json({message:"user does not exsit"})
            }
    
        if(!newDestination.title|| !newDestination.description){
            res.status(404).json({message:"all fields must completed"})
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
    
    //DELETE DEST
     
    
    
    router.delete("/destinations/:id", (req,res)=>{
          const{id}= req.params;
          Travels.removeDestination(id)
          .then(count=>{
            if(count>0){
              res.status(200).json({message: "Destination is deleted"})
          }else{
            res.status(404).json({message: "no destination with that id"})
    
          }
        })
          .catch(error=>res.status(500).json(error))
         })
    
    //UPDATE DEST
   
    
    
    router.patch("/destinations/:id", (req,res)=>{
        const{id}= req.params;
        Travels.updateDestination(id, req.body)
        .then(destination=>{
            res.status(200).json({message:"destination updated"})
    
    })
      
    .catch(error=>{
        res.status(500).json(error)})
    })
    
    //GET DEST BY ID 
    
    
    
    router.get('/destinations/:id',(req,res)=>{
        const{id} = req.params;
        Travels.findDestinationById(id)
        .then(destination=>{
            if(destination){
            res.status(200).json(destination)
        }else{
            res.status(404).json({message:"destination does not exist"})
        }
        })
      
        .catch(error=>{
            res.status(500).json(error)})
        })
        
    // })
    
    //GROUP BY
    
    
    
    router.get('/destinationsNumbers',(req,res)=>{
        Travels.groupDestinations()
        .then(destination=>{
            res.status(200).json(destination)
        })
        .catch(error=>{
            res.status(500).json(error)})
        })
    
  
    
    module.exports = router; 