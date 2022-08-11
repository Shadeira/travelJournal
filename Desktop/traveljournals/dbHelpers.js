const knex = require('knex');
const config = require('./knexfile');
const db = knex(config.development)


//USERS
function getAllUsers(){
return db('users')
}

// ADD USER
async function addUser(user){
//    await db('users').insert(user)
//    return db('users').where({username:user.username})
   return await db('users').insert(user,['id','username'])
    }

//FIND USER BY USERNAME 
function findUserByUsername(username){
 return db('users').where({username:username}).first();
}

//DELETE USER
function removeUser(id){
    return db ('users').where({id:id}).del() 
}

//FIND USER BY ID
function findUserById(id){
    return db("users").where({id:id}).first();
}


function getUserDestinations (user_id){
    return db("users")
    .join("destinations","users.id","destinations.user_id")
    .select(
      "users.id as UserId",
      "users.imageUrl as UserImage",
      "destinations.id as DestinationId",
      "destinations.title as DestinationTitle"
    )
    .where({user_id:user_id})
   
   }

//DESTINATIONS
function getAllDestinations(){
    return db('destinations')
}

// ADD DESTINATION
async function addDestination(newDestination,user_id){
    await db('destinations')
    .where({user_id:user_id})
    .insert(newDestination,["id"])
}


// REMOVE DESTINATION
function removeDestination(id){
    return db ('destinations').where({id:id}).del() 
}

// UPDATE DESTINATION
function updateDestination(id,newDestination){
    return db("destinations")
    .where({id:id})
    .update(newDestination)
   
   }
   
   function findDestinationById(id){ 
     return db("destinations").where({id:id}).first();
   }
   
   function groupDestinations (){
     return db("destinations").count()
     .groupBy("title")
     .select(
       "destinations.id",
       "destinations.title"
     )
   }
   

module.exports = {
    getAllUsers,
    addUser,
    findUserByUsername,
    removeUser,
    findUserById,
    getUserDestinations,
    addDestination,
    getAllDestinations,
    removeDestination,
    updateDestination,
    groupDestinations,
   findDestinationById,

}
