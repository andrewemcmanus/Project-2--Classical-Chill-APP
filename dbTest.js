var db = require('./models')
var track = require('./models/track')
var comment = require('./models/comment')
var user = require('./models/user')
// db.comment.create({
//   name: 'Bob Dylan',
//   content: 'The andswer, my friend, is blowin in the wind.',
//   articleId: 1
// })
// .then(function(comment) {
//   console.log(comment.get())
// })

// const db = require('../labs/express-blogpulse/models')

db.track.findOrCreate({
  where: { trackId: 1 },
  // include: [db.comment]
}).then(function(track) {
  // by using eager loading, the article model should have a comments key
  console.log("does this work")
  console.log(track)
})
// db.article.findOne()
// .then(foundArticle=>{
//   foundArticle.createComment({
//     name: 'Mr.Troll',
//     content:'your article sucks'
//   })
//   .then(createdComment=>)
//   console.log()
// }
db.track.findAll({
  where: {id: 1},
  include: [db.comment]
})
.then(article=>{
  console.log(track.comment)
})