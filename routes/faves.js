const express = require('express')
const router = express.Router();
const axios = require('axios') 
const db = require('../models');
// const { response } = require('express');

router.get('/', (req, res)=> {
    db.faves.findAll()
    .then(response =>{
        res.render('profile', {response})
    })
})

router.post('/', (req, res) => {

    db.fave.findOrCreate({
        where: {name: req.body.track },
        defaults: {trackid: req.body.trackId}
    })
    .then(([response, created]) => {
            res.redirect('profile');
            
    })
    .catch(err =>{
        console.log('error', err);
        res.send(sorry, nodata);
    })
}) 
module.exports = router;