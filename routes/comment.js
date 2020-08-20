let express = require('express')
let db = require('../models')
const { response } = require('express')
let router = express.Router()





router.post('/:id', (req, res)=>{
    db.comment.create({
        name: req.body.name,
        content: req.body.content,
        userId: req.user.id,
        apiTrackId: req.params.id

    })//create a comment to the body
    .then(addComment => {
        console.log(req.body)
        res.redirect(`/track/${req.params.id}`)//got from the router above
    })
    .catch(err=>{
        console.log('Error', err)
    })

})

router.put("/:id", (req, res)=>{
    db.comment.update({// what do you want to updaye whrn you updat? which columns
        name: req.body.name,
        content: req.body.content,
        apiTrackId: req.params.id
    },{

        where:{id: req.body.id}//open
    }).then(response=>{
        console.log(response)
        res.redirect(`/track/${req.params.id}`)
    }).catch(err=>{
        console.log("error", err)
    })
})


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


module.exports =router