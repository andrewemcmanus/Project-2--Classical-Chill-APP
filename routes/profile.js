const express = require('express');
const router = express.Router();
const request = require('request');
const db = require('../models');
const passport = require('../config/ppConfig');
const axios = require('axios')
const querystring = require('querystring');
const { response } = require('express');
let buff = new Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
let authKey = buff.toString('base64');

router.get('/', (req, res)=>{
    let userId = req.user.dataValues.id
    db.user.findByPk(userId, {
        include: [db.track]
    })
    .then(user=>{
        user.tracks.forEach(track=>{
            console.log(track.dataValues)
        })
        
        res.render('profile', {user});
    }).catch(err=>{
        console.log("error", err)
        res.sendStatus(500)
    })
})















module.exports=router