const express = require("express")
const {User} = require("../models/model")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const axios = require("axios");
require("dotenv").config()
const saltRounds =process.env.saltRound;
const accessKey = process.env.Api_access_key


// create a new user
const signUp = async (req,res) => {
    try {
        let {email,username,password} = req.body
        if(!email || !username|| !password){
            return res.send({msg:"both email and password are required"})
        }
        let emailFound = await User.findOne({email})
        let usernameFound = await User.findOne({username})
        if(emailFound){
            return res.send({msg:"the email exist before please choose another email"})
        }
        if(usernameFound){
            res.send({msg:"the user exist before please login or sign up with another gmail"})
        }
        else{

            let hashedPassword = await bcrypt.hash(password,Number(saltRounds))
            let newUser = await User.create({
                username,
                email,
                password: hashedPassword
            })
            return res.send({msg:"registered successfully", newUser})
    }
    } catch (error) {
        res.status(500).json({msg:"can not signup, please try again later",error})
    }
    
}

// get user for log in
const login = async (req,res)=>{
    try {
        let {username,password}= req.body
        if(!username||!password){
            return res.send({msg:"please fill in all the blanks"})
        } 
        let userFound= await User.findOne({username})
        if(!userFound){
            return res.send({msg:"the user does not exist please sign in first"})    
        }else{
            
            let validatePassword = await bcrypt.compare(password, userFound.password)
            if(!validatePassword){
                return res.send({msg:"please enter a valid password"})
            }
                let token = jwt.sign(
                    {userId: userFound._id,username:userFound.username},
                    process.env.privateKey
                    )
                return res.send({msg:"welcome",token})
    }
    } catch (error) {
        res.status(500).send({msg:"can not log in",error})
    }
    
}

// search photo
const SearchPhoto = async (req,res)=>{
    try {
        const query = req.query.title
        const response = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${accessKey}`)
        const photoData = response.data
        res.json(photoData)
        
    } catch (error) {
        res.status(500).send({msg:"server error for search",error})
    }
}


// like photo
const likePhoto = async (req, res) => {
    try {
      let { id,urls,user } = req.body;
    let newPhoto = {
        id,
        urls,
        user
      };
      let user_id = req.user.userId;
      await User.findOneAndUpdate(
        { _id: user_id },
        { $addToSet: { favoritePhotos: newPhoto } });
        res.send({ msg: "Your Photo is saved successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }

   
}

// This code defines a GET route /saved-photos on a router object.
//  When a GET request is made to this route, the code tries to find the user ID from the request object and uses it to find the user in the database using User.findById().
//  It then retrieves the user's favorite photos from the favoritePhotos array and sends them back as a JSON response using res.json().
const getSavedPhotos = async (req, res) => {
    try {
      let user_id = req.user.userId;
      let user = await User.findById(user_id);
      let allSavedPhotos = user.favoritePhotos;
      res.json(allSavedPhotos);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  };

const deleteSavedPhotos = async (req,res) => {
    try {
        const photoId = req.params.id
        const user_id = req.user.userId
        const user= await User.findById(user_id)
        const allSavedPhotos = user.favoritePhotos
        for( let i = 0; i < allSavedPhotos.length; i++){
            if(photoId === allSavedPhotos[i].id){
                await User.findOneAndUpdate(
                    { _id: user_id },
                    { $pull: { favoritePhotos: allSavedPhotos[i] } }
                  );
            }
        }
        res.send("delete Successfully")
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
   
}
module.exports = {login, signUp,SearchPhoto,likePhoto,getSavedPhotos,deleteSavedPhotos}