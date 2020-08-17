const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');
const axios = require('axios')
const querystring = require('querystring')
let buff = new Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
let authKey = buff.toString('base64');

router.get('/', (req, res)=>{
    axios.post('https://accounts.spotify.com/api/token', 
        querystring.stringify({
            grant_type: 'client_credentials',
        }),
        {
            headers: {
                Authorization: `Basic ${authKey}`
           } 
           
    }).then((response)=>{                    
        token = response.data.access_token
        const config ={
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        axios.get('https://api.spotify.com/v1/search?q=bach&type=artist', config)
        .then(response =>{
            console.log(response.data)
        })//use search query in here'
        console.log(token)
      })
    .catch(err=>{
        console.log("error", err.message)
    })

})
module.exports =router