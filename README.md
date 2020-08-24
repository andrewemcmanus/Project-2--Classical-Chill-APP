# Classical Chill app
### a classical music piece favorites and discussion app.
<br />

To reference the Wireframes go to: 
* signup/login page:(https://whimsical.com/SUdBysntPWDVYGPPfcp5R9)
* profile/index : (https://whimsical.com/VbQcfPHkRP29ADcCfwFZg1)
* results?details: (https://whimsical.com/5VLk8iv4AanmGxePXKSrEF)
<br/>
<br/>




## How to use the Classical Chill app

1.  Signup - At the login screen you will choose the sign up button in the top left. to sign up you must enter an email, name, and password with a minimum of 8 characters.

2.  Login - Once the new user profile is saved, you will be directed to the login screen. Login with your information.

3.  Search - after login you will be directed to a search pge where you will search for a music piece( work) by composer and name of the music piece. When a successful search is done there will be a list of relevant search items, chose one to view details on the particular music piece.

4.   Track Details- browse through the track details. you can listen to the music, comment on the piece and see other users' comments as well. you can also save ech track to your profile favorites. from your profile you can click each l;ink of your favorite track and be redirected ba that track again. 

5. signup, login, logout, you can select signup and login at any time and logout anytime you are already logged in. These options at anytime


#### technologies used
* html
* css
* js
* node js
* express
* sequelize
* postman
* express-cli
* chai
* mocha
* supertest
* axios
* bcrypt
* connect-flash
* dotenv
* ejs
* express-ejs-layouts
* express-session
* method-override
* moment
* morgan
* passport
* passport-local
* pg
* request
* rowdy-logger
* sequelize
* sequelize-cli
* session
    





Project 2 will be built on the express auth boilerplate. next we will build our models with the proper columns displayed below:


## Build Models
To reference the ERD (https://whimsical.com/NjovwqZyDcDXrDEALYW8Ny)
### Track Model

| Column | Data Type | 
| --------------- | ------------- |
| composer| String 
| imageUrl | String 
| apiTrackId | String 
| password | String 
|-------------------|------------- |
### Associations:
Place following association, to state users and tracks are joined through usersTracks join model
```js
models.track.belongsToMany(models.user,{through: "usersTracks"})
```

### user model
| Column | Data Type | 
| --------------- | ------------- |
| name | String 
| email | String
| password | String 

|-------------------|------------- |
### Associations:
user and track n:m are joined through usersTracks and user has many comments 1:M
```js
 models.user.belongsToMany(models.track, {through: "usersTracks"})
      models.user.hasMany(models.comment)
```



### Comment Model
| Column | Data Type | 
| --------------- | ------------- |
| name| String 
| content| String 
| apiTrackId | String
| userId| Integer
|-------------------|------------- |
### Associations:
```js
models.comment.belongsTo(models.user)
```


### UsersTracks Model (join)
| Column | Data Type | 
| --------------- | ------------- |
| userId| Integer 
| trackId | Integer
|-------------------|------------- |
### Associations:
Join user and track models through this model

<br/>


### Install node modules from the package.json

```
npm install or npm i
```
<br/>


### Create a new database for the new project

Using the sequelize command line interface, you can create a new database from the terminal.

```
createdb <name>
```
<br/>


In config file, remove default info leaving only the important displayed
e.g.
```js
{
    "development": {
        "database": "project_2",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
      "database": "project_2",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
      "use_env_variable": "DATABASE_URL"
  }
}
```




### Run the migrations

```
sequelize db:migrate

```


if you want to undo migrations for any changes, run:
```
sequelize db:migrate:undo:all

```
<br/>

###  Run nodemon to  make sure it works

```
nodemon
```
<br/>


### Controllers and Views
<br/>

## Views
create profile.ejs, trackDetails.ejs, and trackResults.ejs
<br/>

profile.ejs- will store the ejs for a list of my favorites and the Delete track form.
```js
<%user.tracks.forEach( fave=> {%>
    
    <div class="delete">
        <a href="/track/<%=fave.apiTrackId%>"><h4><%=fave.composer%></h4></a>
            
            <form method="POST" action="/track/<%=fave.id%>?_method=DELETE">
              <button class="btn btn-primary" type="submit">delete</button>
            </form>
          </div>
<%});%>
```
<br/>

#### trackResults.ejs
<br/>

trackResults.ejs - will store ejs to display the results of my search the got to my '/track' page.
```js
<% if (tracks) { %> 
    <% tracks.forEach(track =>{ %>     
        <div> 
            <Ul>   
                <Li>          
                    <a href="/track/<%=track.id%>"><h2><%=track.name%></h2></a> 
                </Li>
            </Ul> 
        </div> 
    <% }); %> 
<% } else { %> 
    <div>track not found</div>
<% } %> 
```
<br/>

#### trackDetails.js
<br/>


trackDetails.ejs - will store ejs for track details from the data tha comes from the Spotify API , the comment form, the comment update and delete forms, and the audio tag. 
```html
<% if (result) { %> 
        <div>                 
            <h2>Work: <%=result.name%></h2> 
            <h3>Artist: <%=result.artists[0].name%></h3> 
            <img id="album" src="<%=result.album.images[0].url%>"alt="hello">
        </div> 
        <audio controls>
            <source src="<%=result.preview_url%>" />
        </audio>
        <div class="faves">
          <form method="POST" action="/track">
            <input hidden type="text" name="name" value="<%= result.name %>">
            <input type="text" name="trackId" value="<%=result.id%>" hidden>
            <button class="btn btn-primary" type="submit">Add to Favorites</button>
          </form>
        </div>
<% } else { %> 
    <div>track not found</div>
<% } %> 

<%comments.forEach(comment=>{%>
  <div class="comment-area">
    <h5 class="comments"><%=comment.name%>: "<%=comment.content%>"</h5>
    <form id="update" action="/comment/<%=result.id%>?_method=PUT" method="POST"> 
      <input type="text" name="name" value="<%=comment.name%>" hidden> 
      <input type="text" name="id" value="<%=comment.id%>" hidden> 
      edit: <input class="text" type="text" name="content" value="<%=comment.content%>">
      <input type="text" name="trackId" value="<%=result.id%>" hidden>
      
      <button class="text" type="submit">Submit</button>
    </form>
  </div>
    <form  action="/comment/<%=comment.id%>?_method=DELETE" method="POST"> 
      <input type="text" name="track-id" id="track-id" value="<%=result.id%>"hidden>
      <button class="text" type="submit">DELETE</button>
    </form>
  </div>
    
  <%})%>
   
</div>
<form class="com-details" action="/comment/<%=result.id%>" method="post">
 Name:<input class="input" type="text" name="name"  > 
   Comment: <input class="main-comment" class="input" type="text" name="content">
   <input type="text" name="trackId" value="<%=result.id%>" hidden>
   <button type="submit">Submit</button>
</form>  
```
#### Controllers 
create controllers, track.js, and comment.js
<br/>

Rememeber when you make your controllers to require them in your server.js like this:
```js
app.use('/auth', require('./routes/auth'));
app.use('/track', isLoggedIn, require('./routes/track'));//mounting 
app.use('/comment', isLoggedIn, require('./routes/comment'))
app.use('/profile', isLoggedIn, require('./routes/profile'))
```

#### track.js
track.js - will store my OAuth requests, api calls, track create and track delete routes.

```js
const express = require('express');
const router = express.Router();
const request = require('request');
const db = require('../models');
const passport = require('../config/ppConfig');
const axios = require('axios')
const querystring = require('querystring');
const { response } = require('express');

let buff = new Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);//SPOTIFY CLIENT_ID AND CLIENT_SECRET in the .env file.

let authKey = buff.toString('base64');// changes authKey to string because Spotify

```
Also, do not forget to export your modules at the bottom of the page:
```js
module.exports =router
```
<br/>


#### Using the Spotify API
The spotify API is a bit difficult to access, because it requires OAUTH, which enables apps to obtain limited access (scopes) to a user's data without giving away a user's password. Therefore you must add a few extra steps in recieving back a specialized token from calling the Spotify API a certain way.

1. sign up at (https://developer.spotify.com/dashboard/) and create a new app so you can get a CLIENT_ID and SECRET_ID. copy and paste both in the .env file.
<br/>



#### Spotify Authorzation and API calls
We will need to access the API and get a bearer token back which gets renewed.
```js
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
        let composer = req.query.composer
        let track = req.query.track
        let query = encodeURIComponent(`${composer} ${track}`)
        axios.get(`https://api.spotify.com/v1/search?q=${query}&type=artist,track&offset=0&limit=20`, config)
        .then((response)=>{                    
            console.log(response.data)
            let tracks = response.data.tracks.items
            res.render('trackResults', {tracks})
          })
          .catch(err =>{
            console.log(err)
          })
        console.log(token)
        
      })
    .catch(err=>{
        console.log("error", err.message)
    })
})
```
<br/>

#### axios call to the api
You have to include your auth gathering code at the beginning to be able to access this as well.
```js
router.get('/:id', (req, res)=>{
    axios.post('https://accounts.spotify.com/api/token',
    querystring.stringify({
        grant_type: 'client_credentials',
    }),
    {
        headers: {
            Authorization: `Basic ${authKey}`
       } 
       
    }).then((response)=>{                    
        let token = response.data.access_token
        const config ={
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        console.log(req.params)
        if(req.params.id === '[object Object]'){
            console.log('this is wrong')
        }else{
            console.log(req.params.id)
        }
        let trackId = req.params.id
        try{
            axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, config)
                .then((response)=> {
            console.log('line 71', response.data.album.images[0])
            let result = response.data
                console.log(result)
            db.comment.findAll({
                where: {apiTrackId: req.params.id}//line 74
            }).then((comments)=>{
                res.render('trackDetails', {comments, result})//render found comments db query and result
            })
            }).catch(err=>{
                // console.log('error', err)
            })
        }catch{
            console.log('this')
        }
    })
})
```
<br/>


#### create and delete tracks
``` js
router.post('/', (req, res)=>{
    db.track.findOrCreate({ 
        where: {apiTrackId: req.body.trackId},
        defaults: {composer: req.body.name}
    }).then(([track, created])=>{
       
       db.user.findOne({
           where:{id: req.user.id}
       })
        .then(user => {
            user.addTrack(track)
            .then(()=>{

                res.redirect('/profile')
            })

        })
        .catch(err=>{
            console.log('Error', err)
        })
    }).catch(err=>{
        console.log("error", err)
    })

})
router.delete('/:id', async(req, res)=>{
    try{
      await db.usersTracks.destroy({ 
        where: {
          userId: req.user.id,
          trackId: req.params.id
        },
        
      });
      res.redirect("/profile")
    }catch(err){
      console.log('Error:', err) 
      
  }

  });
```
<br/>

#### comment.js
  comment.js - will store my create comment, update comment, and delete routes.

  Create comment post route
  ```js


router.post('/:id', (req, res)=>{
    db.comment.create({
        name: req.body.name,
        content: req.body.content,
        userId: req.user.id,
        apiTrackId: req.params.id

    })
    .then(addComment => {
        console.log(req.body)
        res.redirect(`/track/${req.params.id}`)
    })
    .catch(err=>{
        console.log('Error', err)
    })

})
```
#### update comment put route
```js
router.put("/:id", (req, res)=>{
    db.comment.update({
        name: req.body.name,
        content: req.body.content,
        apiTrackId: req.params.id
    },{

        where:{id: req.body.id}
    }).then(response=>{
        console.log("put route for comment", req.params)
        res.redirect(`/track/${req.params.id}`)
    }).catch(err=>{
        console.log("error", err)
    })
})
```
<br/>

#### delete comment delete route
```js
router.delete("/:id", (req, res)=>{
    console.log("delete route for comment", req.params)
    console.log("result", req.body)
    db.comment.destroy({
        where: { id: req.params.id }
      }).then(numRowsDeleted => {
          console.log(numRowsDeleted)
        console.log('row deleted in table', req.params.id)
        console.log('query inside of delete route', req.query)
        
        res.redirect(`/track/${req.body['track-id']}`);
      });
   ```
   <br/>

   ### CSS STYLING
   
   I chose a favorite background picture of mine and matched the color scheme from different color palettes from various websites such as : (https://hookagency.com/website-color-schemes/), (https://www.color-hex.com/color-palettes/), (https://coolors.co/palettes/trending), and more. its important that you edit your background photo to take a bit of brightness out of it so you can read the text against it. the main photo of beethoven (played by Gary Oldman) is from one of my favorite films called 'Immortal Beloved', a beautiful and cathartic biography of Ludwig Van Beethoven's life and music. 
   <br/>

#### Future Goals
 * A 5- star rating feature. This will be a bit more complicated. the logic require adding more models. a it may take some time.

 * Profile name already in the form, while submitting a comment.

 * limiting to only searching the classical music genre through spotify.
 <br/>



 ## Heroku Url
 URL=(https://git.heroku.com/classical-nick.git)
<br/>

 ## To ALL teaching staff, thank you for your help this week! couldn't have done it without you all!
 
