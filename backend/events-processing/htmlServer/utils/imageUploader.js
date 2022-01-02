const { Client } = require('node-scp');
const path = require('path');
const { server: { host, port, username, password, destinationPath } } = require('../config');

const uploadImage = async (filePath) => {
    try {
        const client = await Client({
            host,
            port,
            username,
            password
        });
        const destinationFilePath = `${destinationPath}/${path.basename(filePath)}`;
        await client.uploadFile(filePath, destinationFilePath);
        client.close();
    } catch (e) {
        console.error(`Failed tp upload a file: ${filePath}`);
        console.error(e.message)
    }
}

module.exports = {
    uploadImage
}