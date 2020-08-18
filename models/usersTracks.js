'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersTracks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  };
  usersTracks.init({
    userId: DataTypes.INTEGER,
    trackId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usersTracks',
  });
  return usersTracks;
};