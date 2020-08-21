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
        res.redirect(`/track/${req.params.id}`)//gp to track?:id(string)
    })
    .catch(err=>{
        console.log('Error', err)
    })

})

router.put("/:id", (req, res)=>{
    db.comment.update({// what do you want to update whrn you updat? which columns
        name: req.body.name,
        content: req.body.content,
        apiTrackId: req.params.id
    },{

        where:{id: req.body.id}//open
    }).then(response=>{
        // console.log(response)
        console.log("put route for comment", req.params)
        res.redirect(`/track/${req.params.id}`)
    }).catch(err=>{
        console.log("error", err)
    })
})
router.delete("/:id", (req, res)=>{
    console.log("delete route for comment", req.params)
    console.log("result", req.body)
    db.comment.destroy({
        where: { id: req.params.id }
      }).then(numRowsDeleted => {
          console.log(numRowsDeleted)
        // do something when done deleting
        console.log('row deleted in table', req.params.id)
        console.log('query inside of delete route', req.query)
        
        res.redirect(`/track/${req.body['track-id']}`);
      });
    // db.comment.destroy({//delete comment
    //     name: req.body.name,
    //     content: req.body.content,
        
    // },{

    //     where:{id: req.body.id}//open
    // }).then(response=>{
    //     console.log(response)
    //     res.redirect(`/track/${req.params.id}`)
    // }).catch(err=>{
    //     console.log("error", err)
    // })
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