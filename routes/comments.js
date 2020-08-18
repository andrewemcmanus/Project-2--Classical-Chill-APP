let express = require('express')
let db = require('../models')
let router = express.Router()





router.post('/:id', (req, res)=>{
    db.comment.create(req.body)//create a comment to the body
    .then(addComment => {
        res.redirect('/:id/' + req.body.trackId)//redirect to articles then individual articles
    })
    .catch(err=>{
        console.log('Error', err)
    })

})

const db = require('./models')

db.article.findOne({
  where: { id: 1 },
  include: [db.comment]
}).then(function(article) {
  // by using eager loading, the article model should have a comments key
  console.log(article.comments)
})

db.article.findAll({
  where: {id: 1},
  include: [db.comment]
})
.then(article=>{
  console.log(article.comments)
})


