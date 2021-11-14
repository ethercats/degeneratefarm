const web3 = require('../utils/web3');
const { processEvent } = require('../utils/parser');
const {
    contract: {
        ABI,
        ADDRESS
    },
} = require('../config')

class EventHandler {
    static initialise() {
        EventHandler.listenForEvent().catch((err) => console.error(err.methods));
    }

    static async listenForEvent(startingBlock = 'latest') {
        console.log('Get deployed contract instance.')
        const deployedContract = new web3.eth.Contract(ABI, ADDRESS)

        console.log('Start listening for Transfer...')
        deployedContract.events.Transfer({
            filter: { from: 0 },
            fromBlock: startingBlock
        }).on('connected', (subscriptionId) => {
            console.log(`Listening for contract 'Transfer' event from block: ${startingBlock}, subscriptionId: ${subscriptionId}`)
        }).on('data', async (event) => {
            await EventHandler.processTransferEvent(event)
        }).on('error', (error, receipt) => {
            console.error(`Failed to handle a Transfer event, error: ${JSON.stringify(error)}, receipt: ${receipt}`)
        })
    }

    static async processTransferEvent(event) {
        console.log('Processing Transfer event...');

        try {
            await processEvent(event);
        } catch (err) {
            console.error(`Failed to handle Transfer event, error: ${err.message}`);
        }
    }
}

module.exports = EventHandler;