const path = require('path');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const HTMLTemplate = `<!DOCTYPE html>
<html lang="en" style="height: 100%; width: 100%">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
    <link href="./css/main.css" rel="stylesheet">
</head>

<body>
    <div class="preloader">
        <div class="spinner"></div>
    </div>
    <div id="wrapper">
        <div class="nft">
            <img id="bg" src="">
            <img id="tail" src="">
            <img id="ears" src="">
            <img id="eyes" src="">
            <img id="body-right-hoof" src="">
            <img id="teeth" src="">
            <img id="tongue" src="">
            <img id="eye-expression" src="">
            <img id="left-hoof" src="">
            <img id="chips" src="">
            <img id="plaques" src="">
            <img id="left-card" src="">
            <img id="right-card" src="">
        </div>
        </div>
</body>
<script src="./js/render-image.js"></script>
<script src="./js/alchemyWeb3.min.js"></script>
<script src="./js/script.js"></script>

</html>`;

const processMintEvent = async (event) => {
    const tokenId = event.returnValues['tokenId'];
    const filePath = getHTMLPath(tokenId);

    await writeFileAsync(filePath, HTMLTemplate);
    console.log(event.returnValues[2] + ".html has been saved.");
}

const getHTMLPath = (tokenId) => {
    return path.resolve(__dirname, '..', '..', '..', 'www', 'www', 'nfts', 'pigs', `${tokenId}.html`)
}

const parseTokenId = (event) => {
    return event.returnValues['tokenID'];
}

module.exports = {
    processMintEvent,
    parseTokenId
}