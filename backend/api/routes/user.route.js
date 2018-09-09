const express = require('express');
const router = express.Router();
// Getting the User Controller

const UserController = require('../controllers/user.controller');

// Map each API to the Controller Functions

router.post('/login', UserController.authenticate);
router.post('/register', UserController.createUser);
router.get('/getusers', UserController.getUsers);
router.get('/edit/:id', UserController.getUserById);
router.put('/update/:id', UserController.updateUser);
router.delete('/delete/:id', UserController.removeUser);


// Export the Router
module.exports = router;