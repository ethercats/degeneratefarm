const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

class ProcessedBlockModel extends Model {}
ProcessedBlockModel.init({
    blockNumber: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'processedblock',
    timestamps: false,
    freezeTableName: true
});

ProcessedBlockModel.removeAttribute('id');

ProcessedBlockModel.getBlockNumber = async () => {
    return ProcessedBlockModel.findOne();
};
ProcessedBlockModel.updateBlockNumber = async (blockNumber) => {
    const lastBlock = await ProcessedBlockModel.findOne();
    await lastBlock.update({ blockNumber });
};

ProcessedBlockModel.sync();

module.exports = ProcessedBlockModel;
