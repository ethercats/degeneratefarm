const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

class PigModel extends Model {}
PigModel.init({
    pig: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    stacksize: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalaces: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    matchingaces: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    diamondaces: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'pigs',
    timestamps: false,
    freezeTableName: true
});

PigModel.removeAttribute('id');
PigModel.sync();

module.exports = PigModel;
