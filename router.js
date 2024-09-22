const express = require('express');
//create router module
const router = express.Router();
let users = [
    { id: 1, name: "Ben", age: 20 },
    { id: 2, name: "John", age: 30 },
    { id: 3, name: "Chris", age: 40 },
    { id: 4, name: "Jane", age: 60 },
  ];

//Calculate the next available user id
function getNextUserId(users){
    [1,2,3,4]
    const userIds = users.map(function(user){
        return user.id;
    })
    return Math.max(...userIds,-1) +1; //empty, return -1
}

//GET fetch all users
router.get('/users', (req, res)=>{
    res.status(200).json({
        status:'success',
        message: 'Retrieved users successfully',
        data: users,
    })
})
//POST add a new user //需要解决json解析 去server.js，要挂载在router之前
router.post('/users', (req,res)=>{
    const newUser = req.body;
    if (!newUser.name|| !newUser.age){
        return res.status(400).json({
            status:'Error',
            message:'Name and age are required'
        });
    }
    const newId = getNextUserId(users);
    let obj = {id:newId, name: newUser.name, age: newUser.age};
    users.push(obj);
    res.status(200).json({
        status:'success',
        message: 'User added successfully',
        data: users,
    });
});
//DELETE delete all users
router.delete('/users',(req,res)=>{
    users = [];
    res.status(204).send();
})
//DELETE delete user by id
router.delete('/users/:id', (req,res)=>{
    const userIdToDelete = parseInt(req.params.id);
    const initialUserCount= users.length;
    //filter 也可以用for循环，
    users = users.filter((user)=>{
        return user.id != userIdToDelete
    })
    if(users.length === initialUserCount){
        return res.status(404).json({
            status:'error',
            message:'User not found'
        })
    }
    res.status(200).json({
        status:'Success',
        message:`User with ID ${userIdToDelete} deleted successfully.`,
        data: users
    })
})
module.exports = router;