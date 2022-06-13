"use strict";

const express = require("express");
const { Users } = require("./models/index-model");
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const signInRouter = express.Router();
const basic = require('./middleware/basic');


signInRouter.get("/users", getUsers);
async function getUsers(req, res) {
  const getUsers = await Users.findAll();
  res.status(200).json(getUsers);
}

signInRouter.post("/signin", basic, signIn);
async function signIn(req, res) {
// if (req.headers.authorization) {
  let basicHeaderParts = req.headers.authorization.split(' ');  
  let encodedString = basicHeaderParts.pop();  
  let decodedString = base64.decode(encodedString); 
  let [username, password] = decodedString.split(':'); 
  try {
    const user = await Users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    }
    else {
      throw new Error('Invalid User or wrong password');
    }
  } catch (error) { res.status(403).send('Error Login'); }
// }
};

module.exports = signInRouter;