// let express = require('express')
// let db = require('../models')
// let router = express.Router()





// router.post('/', (req, res)=>{
//     db.comment.create(req.body)//create a comment to the body
//     .then(addComment => {
//         res.redirect('/track/:id/' + req.body.trackId)
//     })
//     .catch(err=>{
//         console.log('Error', err)
//     })

// })



// db.track.findOne({
//   where: { id: 1 },
//   include: [db.comment]
// }).then(function(track) {
  
//   console.log(track.comment)
// })

// db.track.findAll({
//   where: {id: 1},
//   include: [db.comment]
// })
// .then(track=>{
//   console.log(track.comments)
// })


