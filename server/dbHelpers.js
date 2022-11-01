const knex = require('knex');
const config = require ('./knexfile');
const db = knex(config.development)


//ALL USERS
function getAllUsers(){
return db('users')
}

//ADD USER
async function addUser(user){
await db('users').insert(user)
 return db('users').where({username:user.username})
}

//FIND USER BY USERNAME
function findUserByUsername(username){
    return db('users').where({username:username}).first();
}


//DELETE USER
function removeUser(id){
    return db('users').where({id:id}).del()
}

//FIND USER BY ID
function findUserById(id){
    return db('users').where({id:id}).first();

}

//ALL DESTINATIONS
function getAllDestinations(){
    return db('destinations')
    }



//ADD DESTINATION
async function addDestination(newDestination, user_id){
    await db('destinations')
     .where({user_id:user_id})
     .insert(newDestination,["id"])
    }
 
    
// REMOVE DESTINATION
function removeDestination(id){
    return db('destinations').where({id:id}).del()

}



// UPDATE DESTINATION
function updateDestination(id, newDestination){
    return db('destinations').where({id:id}).update(newDestination)

}

// FIND DESTINATION BY ID
function findDestinationById(id){
    return db('destinations').where({id:id}).first();

}


function groupDestinations(){
    return db('destinations').count()
    .groupBy("title")
    .select(
        "destinations.id",
        "destinations.title"
    )

}

module.exports ={
    getAllUsers,
    addUser,
    findUserByUsername,
    removeUser,
    findUserById,
    getAllDestinations,
    addDestination,
    removeDestination,
    updateDestination,
    findDestinationById,
    groupDestinations
}