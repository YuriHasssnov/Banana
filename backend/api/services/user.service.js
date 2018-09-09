const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Async function to get the User List
exports.authenticate = async function (email, password) {
  console.log("email : " + email);
  console.log("password : " + password);  
  try {
    let user = await User.findOne({ 'email': email });
    // Return the authenticated user that was returned by the mongoose promise
    let result = await bcrypt.compare(password, user.password);
    if (result) {
      console.log("result : " + result);
      return {
        email: user.email,
        password: user.password,
        token: jwt.sign({ sub: user._id }, 'secretcode_jasndkasjdbajhsbdjhbasjd')
      };
    } else {
      throw Error();
    }

  } catch (e) {
    // return a Error message describing the reason
    throw Error('Error while user authenticate');
  }
};

exports.createUser = async function (user) {

  // Creating a new Mongoose Object by using the new keyword
  let newUser = new User({
    name: user.name,
    email: user.email,
    username: user.username,
    password: user.password
  });

  newUser.password = await bcrypt.hash(user.password, 10);

  try {
    // Saving the User
    let savedUser = await newUser.save();
    return savedUser;
  } catch (e) {
    // return an Error message describing the reason
    throw Error("Error while Creating User");
  }
};

exports.getUsers = async function (query, page, limit) {

  // Options setup for the mongoose paginate
  let options = {
    page,
    limit
  };

  // Try Catch the awaited promise to handle the error
  try {
    let users = await User.paginate(query, options);
    // Return the user list that was returned by the mongoose promise
    return users;
  } catch (e) {
    // return a Error message describing the reason
    throw Error('Error while Paginating Users!');
  }
};

exports.getUserById = async function (id) {

  try {
    //Find the old User Object by the Id
    user = await User.findById(id);
    return user;
  } catch (e) {
    throw Error("Error occured while Finding the User!");
  }


};

exports.updateUser = async function (user) {
  let id = user.id;
  let oldUser;

  try {
    //Find the old User Object by the Id    
    oldUser = await User.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the User!");
  }
  // If no old User Object exists return false
  if (!oldUser) {
    return false;
  }
  //Edit the User Object
  oldUser.name = user.name || oldUser.name;
  oldUser.email = user.email || oldUser.email;
  oldUser.username = user.username || oldUser.username;
  oldUser.password = user.password || oldUser.password;
  try {
    let savedUser = await oldUser.save();
    return savedUser;
  } catch (e) {
    throw Error("And Error occured while updating the User!");
  }
};

exports.deleteUser = async function (id) {
  // Delete the User
  try {
    let deleted = await User.findOneAndRemove({ _id: id });
    return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the User!")
  }
};