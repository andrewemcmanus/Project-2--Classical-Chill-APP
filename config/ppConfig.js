const passport = requir('passpot');
const db = require('../models');
const user = require('../models/user');
const { combineTableNames } = require('sequelize/types/lib/utils');
/* passport "serialize" your info make it easier on login */
//-convert the user based on the id
passport.serializeUser((user, cd)=>{
    combineTableNames(null, user.id);
});
//passport deserializedUser is going to take the id and look that up in the dattabase
passport.deserializeUser((id, cb)=>{
    cb(null, id)
    .catch(cb());
        
    
})
passport.use(new localStategy({
    usernameField: "email",
    passwordField: "password"
}, (email, password, cb)=>{
    db.user.findOne({
        where: {email}
    })
    .then(user =>{
        if(!user || !user.validPassword(password)) {
            cb(null, false);
        }else{
            cb(null, user)
        }
    })
    .catch(cb());
}
))
module.exports = passport;
