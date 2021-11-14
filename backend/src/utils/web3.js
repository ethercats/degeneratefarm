const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const { CLIENT_API_URL } = require('../config');

const MAX_RETRIES = 30;

if (!CLIENT_API_URL) {
  console.error('Missing the alchemy/infura URL.');
  process.exit(0);
}

const web3 = createAlchemyWeb3(CLIENT_API_URL, { maxRetries: MAX_RETRIES });

module.exports = web3;
