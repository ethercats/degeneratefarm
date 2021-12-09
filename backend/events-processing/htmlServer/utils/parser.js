const path = require('path');
const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
const nodeHtmlToImage = require('node-html-to-image');
const Handlebars = require('handlebars');

const writeFileAsync = promisify(writeFile);
const readFileAsync = promisify(readFile);

const HTMLTemplate = `<!DOCTYPE html>
<html lang="en" style="height: 100%; width: 100%">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
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
        <div id="acesData"><span id="acesTotal"></span></div>
        </div>
        </div>
</body>
<script src="./js/alchemyWeb3.min.js"></script>
<script src="./js/script.js"></script>

</html>`;

const HTMLTemplateRender = `<!DOCTYPE html>
<html lang="en" style="height: 100%; width: 100%">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="./css/main.css" rel="stylesheet">
</head>

<body>
    <div class="preloader">
        <div class="spinner"></div>
    </div>
    <div id="wrapper">
        <div class="nft">
            <div id="pig-card">
                <img id="bg" src="">
                <img id="tail" src="">
                <img id="ears" src="">
                <img id="eyes" src="">
                <img id="body-right-hoof" src="">
                <img id="teeth" src="">
                <img id="tongue" src="">
                <img id="eye-expression" src="">
                <img id="left-hoof" src="">
            </div>
        </div>
    </div>
</body>
<script src="./js/render-image.js"></script>
<script src="./js/alchemyWeb3.min.js"></script>
<script src="./js/script.js"></script>

</html>`;

const HBSTemplate = `<!DOCTYPE html>
<html lang="en" style="height: 100%; width: 100%">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <style>
        body {
            width: 600px;
            height: 800px;
        }
        html {
            overflow: hidden;
            display: flex;
            justify-content: center;
            background: #101921;
        }

        #wrapper {
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-content: space-around;
            align-items: center;
        }

        .nft {
            position: relative;
            display: flex;
            justify-content: center;
        }

        #pig-card {
            position: relative;
            z-index: 0;
            overflow: hidden;
            max-width: 100%;
            margin: 8px;
            display: flex;
            justify-content: center;
            align-content: space-around;
            align-items: center;
        }

        #left-hoof {
            position: absolute;
            z-index: 9;
        }

        #eye-expression {
            position: absolute;
            z-index: 8;
        }

        #tongue {
            position: absolute;
            z-index: 7;
        }

        #teeth {
            position: absolute;
            z-index: 6;
        }

        #body-right-hoof {
            position: absolute;
            z-index: 5;
        }

        #eyes {
            position: absolute;
            z-index: 4;
        }

        #ears {
            position: absolute;
            z-index: 3;
        }

        #tail {
            position: absolute;
            z-index: 2;
        }

        #bg {
            position: relative;
            z-index: 1;
        }
    </style>
</head>

<body>
    <div id="wrapper">
        <div class="nft">
            <div id="pig-card">
                <img id="bg" src="{{bgUrl}}">
                <img id="tail" src="{{tailUrl}}">
                <img id="ears" src="{{earsUrl}}">
                <img id="eyes" src="{{eyesUrl}}">
                <img id="body-right-hoof" src="{{bodyRightHoofUrl}}">
                <img id="teeth" src="{{teethUrl}}">
                <img id="tongue" src="{{tongueUrl}}">
                <img id="eye-expression" src="{{eyeExpressionUrl}}">
                <img id="left-hoof" src="{{leftHoofUrl}}">
            </div>
        </div>
    </div>
</body>

</html>`

const processMintEvent = async (event) => {
    const tokenId = event.returnValues['tokenId'];
    const filePath = getHTMLPath(tokenId);
    const filePathRender = getHTMLRenderPath(tokenId);
    
    await writeFileAsync(filePath, HTMLTemplate);
    await writeFileAsync(filePathRender, HTMLTemplateRender);
    console.log(event.returnValues[2] + ".html has been saved.");

    await generatePreviewImage(tokenId);
}

const getHTMLPath = (tokenId) => {
    return path.resolve(__dirname, '..', '..', '..', 'www', 'www', 'nfts', 'pigs', `${tokenId}.html`)
}

const getHTMLRenderPath = (tokenId) => {
    return path.resolve(__dirname, '..', '..', '..', 'www', 'www', 'nfts', 'pigs', 'preview-images', `${tokenId}.html`)
}

const getImageDestinationPath = (tokenId) => {
    return path.resolve(__dirname, '..', '..', '..', 'www', 'www', 'nfts', 'pigs', 'preview-images', `${tokenId}.png`)
}

const getImagesBasePath = () => {
    return path.resolve(__dirname, '..', '..', '..', '..', 'nft-rendering', 'img');
}

const generatePreviewImage = async (tokenId) => {
    console.log(`Generate image for ${tokenId}`);
    const template = Handlebars.compile(HBSTemplate);
    const params = await getImageParams(tokenId);
    const finalTemplate = template(params);

    await nodeHtmlToImage({
        output: getImageDestinationPath(tokenId),
        html: finalTemplate
    });
    console.log(`${tokenId}.png has been saved.`);
}

const getImageParams = async (tokenId) => {
    const propertyValues = tokenId.slice(-10);
    const bgNumber = propertyValues.charAt(0);
    const tailNumber = propertyValues.charAt(1);
    const earsNumber = propertyValues.charAt(2);
    const eyesNumber = propertyValues.charAt(3);
    const bodyRightHoofNumber = propertyValues.substr(4, 2);
    const teethNumber = propertyValues.charAt(6);
    const tongueNumber = propertyValues.charAt(7);
    const eyeExpressionNumber = propertyValues.charAt(8);
    const leftHoofNumber = propertyValues.charAt(9);

    return {
        bgUrl: await getBase64Image(getImagesBasePath() + '/bg/' + bgNumber + '.png'),
        tailUrl: await getBase64Image(getImagesBasePath() + '/tail/' + tailNumber + '.png'),
        earsUrl: await getBase64Image(getImagesBasePath() + '/ears/' + earsNumber + '.png'),
        eyesUrl: await getBase64Image(getImagesBasePath() + '/eyes/' + eyesNumber + ".png"),
        bodyRightHoofUrl: await getBase64Image(getImagesBasePath() + '/body-right-hoof/' + bodyRightHoofNumber + '.png'),
        teethUrl: await getBase64Image(getImagesBasePath() + '/teeth/' + teethNumber + '.png'),
        tongueUrl: await getBase64Image(getImagesBasePath() + '/tongue/' + tongueNumber + '.png'),
        eyeExpressionUrl: await getBase64Image(getImagesBasePath() + '/eye-expression/' + eyeExpressionNumber + '.png'),
        leftHoofUrl: await getBase64Image(getImagesBasePath() + '/left-hoof/' + leftHoofNumber + '.png'),
    }
}

const getBase64Image = async (imagePath) => {
    const image = await readFileAsync(imagePath);
    const base64Image = new Buffer.from(image).toString('base64');
    return 'data:image/jpeg;base64,' + base64Image;
}

const parseTokenId = (event) => {
    return event.returnValues['tokenID'];
}

module.exports = {
    processMintEvent,
    parseTokenId
}