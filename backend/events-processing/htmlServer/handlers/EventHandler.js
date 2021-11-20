const web3 = require('../utils/web3');
const PigModel = require('../models/pig.model');
const { processMintEvent, parseTokenId } = require('../utils/parser');
const {
    contract: {
        ABI,
        ADDRESS
    },
} = require('../config')

class EventHandler {
    static initialise() {
        EventHandler.listenForEvent().catch((err) => console.error(err.message));
    }

    static async listenForEvent(startingBlock = 20697243) { //'latest') {
        console.log('Get deployed contract instance.')
        const deployedContract = new web3.eth.Contract(ABI, ADDRESS)

        deployedContract.events.Transfer({
            filter: { from: 0 }, //Mints are all transfer events, but coming from the blackhole address (from: 0)
            fromBlock: startingBlock
        }).on('connected', (subscriptionId) => {
            console.log(`Listening for mint events from block: ${startingBlock}, under subscriptionId: ${subscriptionId}`)
        }).on('data', async (event) => {
            console.log(event.returnValues[1] + " has minted token ID " + event.returnValues[2] + ". This is Pig #" + event.returnValues[2].substring(0, event.returnValues[2].length - 10) + ".")
            await EventHandler.processTransferEvent(event)
        }).on('error', (error, receipt) => {
            console.error(`Failed to handle a mint event, error: ${JSON.stringify(error)}, receipt: ${receipt}`)
        })

        deployedContract.events.HandDealt({
            fromBlock: startingBlock
        }).on('connected', (subscriptionId) => {
            console.log(`Listening for HandDealt events from block: ${startingBlock}, under subscriptionId: ${subscriptionId}`)
        }).on('data', async (event) => {
            await EventHandler.processUpdateEvent(event, deployedContract)
            //Show upgrade in console log only if is not from a mint event.
            if (event.returnValues[3] == false) {
                console.log(event.returnValues[0] + " has been upgraded.")
            }
        }).on('error', (error, receipt) => {
            console.error(`Failed to handle a HandDealt event, error: ${JSON.stringify(error)}, receipt: ${receipt}`)
        })
    }

    static async processTransferEvent(event) {
        try {
            await processMintEvent(event);
        } catch (err) {
            console.error(`Failed to handle a mint event, error: ${err.message}`);
        }
    }

    static async processUpdateEvent(event, contract) {
        try {
            await EventHandler.updateLeaderboard(event, contract);
        } catch (err) {
            console.error(`Failed to handle an update event, error: ${err.message}`);
        }
    }

    static async updateLeaderboard(event, contract) {
        const tokenId = parseTokenId(event);

        const totalStack = await contract.methods.totalStack(tokenId).call();

        const data = await contract.methods.getUpgrades(tokenId).call();

        const totalAces = data[2];
        const matchingAces = data[3];
        const diamondAces = data[4];

        await PigModel.upsert({
            pig: tokenId,
            stacksize: totalStack,
            totalaces: totalAces,
            matchingaces: matchingAces,
            diamondaces: diamondAces,
        });
    }
}

module.exports = EventHandler;