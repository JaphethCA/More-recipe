'use strict';

module.exports = function (sequelize, DataTypes) {
  var Reviews = sequelize.define('Reviews', {
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    RecipeId: {
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER
    }

  });
  return Reviews;
};