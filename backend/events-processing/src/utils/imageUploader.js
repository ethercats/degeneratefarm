const { Client } = require('node-scp');
const path = require('path');
const { server: { host, port, username, password, destinationPath } } = require('../config');

let client;

const uploadImage = async (filePath) => {
    try {
        if (!client) {
            client = await Client({
                host,
                port,
                username,
                password
            });
        }
        const destinationFilePath = `${destinationPath}/${path.basename(filePath)}`;
        await client.uploadFile(filePath, destinationFilePath);
    } catch (e) {
        console.error(`Failed to upload a file: ${filePath}`);
        console.error(e.message)
    }
}

const closeClient = () => {
    client.close();
    client = null;
}

module.exports = {
    uploadImage,
    closeClient
}
