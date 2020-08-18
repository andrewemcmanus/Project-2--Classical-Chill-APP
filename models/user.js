'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.user.belongsToMany(models.track, {through: "usersTracks"})
      models.user.hasMany(models.comment)
    }
  };
  user.init({
    name: {
      type:DataTypes.STRING,
      validate:{
        len:{
          args:[1, 99],
          msg:'Name must be 1 to 99 characters'//name
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail:{
          msg:"Invalid Email"//email
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        len:{
          args:[8, 99],
          msg:'Password must be between 8 to 99 characters'//password
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });

  user.addHook('beforeCreate', function(pendingUser){
    //hash password for us
    let hash = bcrypt.hashSync(pendingUser.password, 12);// no more than 12
    pendingUser.password = hash;
  })
    
    user.prototype.validPassword = function(passwordTyped){//is password typed in same as password saved in db?
      let correctPassword = bcrypt.compareSync(passwordTyped, this.password)//password in db
      //return true or false based on correct password
      return correctPassword;
    }

  
//remove the password before it gets serialized
  user.prototype.toJSON = function() {
    let userData = this.get();
    delete userData.password;
    return userData;
  }

  return user;
  
};

//user js to routes