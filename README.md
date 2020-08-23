# Classical Chill app
### a classical music piece favorites and discussion app.

| Project 2 will be built on the auth boilerplate. next we will build our models with the proper columns displayed below:

## Build Models

### Track Model

| Column | Data Type | 
| --------------- | ------------- |
| composer| String 
| imageUrl | String 
| apiTrackId | String 
| password | String 
|-------------------|------------- |
### associations:
place following association, to state users and tracks are joined through usersTracks join model
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
### associations:
user and tracks n:m are joined through usersTracks and user has many comments 1:M
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
### associations:
```js
models.comment.belongsTo(models.user)
```


### UsersTracks Model (join)
| Column | Data Type | 
| --------------- | ------------- |
| userId| Integer 
| trackId | Integer
|-------------------|------------- |
### associations:
join user and track models through this model







### Install node modules from the package.json

```
npm install or npm i
```



### Create a new database for the new project

Using the sequelize command line interface, you can create a new database from the terminal.

```
createdb <name>
```
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


####  Run nodemon to  make sure it works

```
nodemon
```


