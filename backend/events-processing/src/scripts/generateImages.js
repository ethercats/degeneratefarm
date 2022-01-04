const { orderBy } = require('lodash');
const web3 = require('../utils/web3');
const ProcessedBlockModel = require('../models/processed-block.model');
const { processMintEvent } = require('../utils/parser');
const { closeClient } = require('../utils/imageUploader');
const {
    contract: {
        ABI,
        ADDRESS
    },
} = require('../config');

const processPastMintEvents = async () => {
    console.log('Get deployed contract instance.')
    const deployedContract = new web3.eth.Contract(ABI, ADDRESS)

    const { blockNumber } = await ProcessedBlockModel.getBlockNumber();
    console.log(`Processing past mint events starting from ${blockNumber} block...`);

    const events = await deployedContract.getPastEvents(
        'Transfer',
        {
            filter: { from: 0 }, //Mints are all transfer events, but coming from the blackhole address (from: 0)
            fromBlock: blockNumber,
            toBlock: 'latest'
        },
    );

    console.log(`Number of events to be processed: ${events.length}`);
    if (!events.length) {
        return;
    }

    const orderedEvents = orderBy(events, ['blockNumber'], ['asc']);
    for (const event of orderedEvents) {
        console.log('Processing: ', event.blockNumber);
        await processMintEvent(event);
        await sleep(10000);
    }

    if (orderedEvents.length) {
        const lastProcessedBlockNumber = orderedEvents[orderedEvents.length - 1].blockNumber;
        await ProcessedBlockModel.updateBlockNumber(lastProcessedBlockNumber);
    }

    closeClient();

    console.log('Successfully processed past mint blocks');
};

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

processPastMintEvents().catch(err => console.error(err));

