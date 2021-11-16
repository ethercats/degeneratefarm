let pigName = ""

const nftHTML = `<!DOCTYPE html>
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

<script src="./js/alchemyWeb3.min.js"></script>
<script src="./js/script.js"></script>

</html>`

const pig = {
    "attributes": [{
        "trait_type": "Background",
        "value": ""
    },
        {
            "trait_type": "Tail",
            "value": ""
        },
        {
            "trait_type": "Ears",
            "value": ""
        },
        {
            "trait_type": "Eye Color",
            "value": ""
        },
        {
            "trait_type": "Teeth",
            "value": ""
        },
        {
            "trait_type": "Tongue",
            "value": ""
        },
        {
            "trait_type": "Eye Expression",
            "value": ""
        },
        {
            "trait_type": "Left Hoof",
            "value": ""
        },
        {
            "trait_type": "Right Hoof",
            "value": ""
        }
    ],
    "description": "",
    "external_url": "",
    "animation_url": "",
    "image": "",
    "name": ""
}

function getBackground(n) {

    switch (true) {
        case (n == 0):
            return "Level 1"
        case (n == 1):
            return "Level 2"
        case (n == 2):
            return "Level 3"
        case (n == 3):
            return "Level 4"
        case (n == 4):
            return "Level 5"
        case (n == 5):
            return "Level 6"
        case (n == 6):
            return "Level 7"
        case (n == 7):
            return "Level 8"
        case (n == 8):
            return "Level 9"
        case (n == 9):
            return "Level 10"
    }
}

function getBodyRightHoof(n) {
    console.log(n)
    switch (true) {
        //Kim Jong Pig
        case (n == "00"):
            pigName = "Kim Jong Pig"
            return "Empty"
        case (n == "01"):
            pigName = "Kim Jong Pig"
            return "Cheeseburger"
        case (n == "02"):
            pigName = "Kim Jong Pig"
            return "French Fries"
        case (n == "03"):
            pigName = "Kim Jong Pig"
            return "Cigarette"
        case (n == "04"):
            pigName = "Kim Jong Pig"
            return "Lollipop"
        case (n == "05"):
            pigName = "Kim Jong Pig"
            return "Ice Cream"
        case (n == "06"):
            pigName = "Kim Jong Pig"
            return "Blueberry Muffin"
        case (n == "07"):
            pigName = "Kim Jong Pig"
            return "Cookie"
        case (n == "08"):
            pigName = "Kim Jong Pig"
            return "Cake"
        case (n == "09"):
            pigName = "Kim Jong Pig"
            return "Bratwurst"
    }
}

function getTail(n) {

    switch (true) {
        case (n == 0):
            return "Gorby"
        case (n == 1):
            return "Excited"
        case (n == 2):
            return "Gorby Curled"
        case (n == 3):
            return "Hooked"
        case (n == 4):
            return "Squiggly Six"
        case (n == 5):
            return "Horny Nine"
        case (n == 6):
            return "Chunky Six"
        case (n == 7):
            return "Loopy"
        case (n == 8):
            return "Wavy Out"
        case (n == 9):
            return "Wavy Loopback"
    }
}

function getEars(n) {

    switch (true) {
        case (n == 0):
            return "Innocent"
        case (n == 1):
            return "Hazy Recollection"
        case (n == 2):
            return "Snitcher"
        case (n == 3):
            return "Shady"
        case (n == 4):
            return "Miserable"
        case (n == 5):
            return "Broken Spirit"
        case (n == 6):
            return "Arrogant"
        case (n == 7):
            return "Brawler"
        case (n == 8):
            return "Scrapper"
        case (n == 9):
            return "Troublemaker"
    }
}

function getEyeColor(n) {

    switch (true) {
        case (n == 0):
            return "Hogtie Hazel"
        case (n == 1):
            return "Abusive Blue"
        case (n == 2):
            return "Pighole Brown"
        case (n == 3):
            return "Informant Green"
        case (n == 4):
            return "Gulag Grey"
        case (n == 5):
            return "Execution Amber"
        case (n == 6):
            return "Racist Red"
        case (n == 7):
            return "Concertina Blue"
        case (n == 8):
            return "Prison Purple"
        case (n == 9):
            return "Gestapo Green"
    }
}

function getTeeth(n) {

    switch (true) {
        case (n == 0):
            return "Workers Union"
        case (n == 1):
            return "Politburo"
        case (n == 2):
            return "Village"
        case (n == 3):
            return "Factory Line"
        case (n == 4):
            return "Union Chief"
        case (n == 5):
            return "Komsomol"
        case (n == 6):
            return "Partial to the Party"
        case (n == 7):
            return "Intelligence Service"
        case (n == 8):
            return "Socialized Dentistry"
        case (n == 9):
            return "Criminal"
    }
}

function getTongue(n) {

    switch (true) {
        case (n == 0):
            return "Conformist"
        case (n == 1):
            return "Devious"
        case (n == 2):
            return "Greedy"
        case (n == 3):
            return "Satisfied"
        case (n == 4):
            return "Salivating"
        case (n == 5):
            return "Taunting"
        case (n == 6):
            return "Joking"
        case (n == 7):
            return "Bloviating"
        case (n == 8):
            return "Satiated"
        case (n == 9):
            return "Split"
    }
}

function getEyeExpression(n) {

    switch (true) {
        case (n == 0):
            return "Content"
        case (n == 1):
            return "Perturbed"
        case (n == 2):
            return "Curious"
        case (n == 3):
            return "Serious"
        case (n == 4):
            return "Confused"
        case (n == 5):
            return "Wide Eyed"
        case (n == 6):
            return "Left Eye Shut"
        case (n == 7):
            return "Right Eye Shut"
        case (n == 8):
            return "Right Eye Squinting"
        case (n == 9):
            return "Left Eye Squinting"
    }
}

function getLeftHoof(n) {

    switch (true) {
        case (n == 0):
            return "Beer"
        case (n == 1):
            return "Strawberry Daiquiri"
        case (n == 2):
            return "Blue Martini"
        case (n == 3):
            return "Mojito"
        case (n == 4):
            return "Piña Colada"
        case (n == 5):
            return "Cola"
        case (n == 6):
            return "Tequila Sunrise"
        case (n == 7):
            return "Pomegranate Lemon Fizz"
        case (n == 8):
            return "Chocolate Milkshake"
        case (n == 9):
            return "Strawberry Milkshake"
    }
}

function buildMetadata(tokenID) {

    const properties = tokenID.slice(-10)

    const background = pig.attributes[0]
    const tail = pig.attributes[1]
    const ears = pig.attributes[2]
    const eyeColor = pig.attributes[3]
    const teeth = pig.attributes[4]
    const tongue = pig.attributes[5]
    const eyeExpression = pig.attributes[6]
    const leftHoof = pig.attributes[7]
    const rightHoof = pig.attributes[8]

    background.value = getBackground(properties.charAt(0))
    tail.value = getTail(properties.charAt(1))
    ears.value = getEars(properties.charAt(2))
    eyeColor.value = getEyeColor(properties.charAt(3))
    rightHoof.value = getBodyRightHoof(properties.substr(4, 2))
    teeth.value = getTeeth(properties.charAt(6))
    tongue.value = getTongue(properties.charAt(7))
    eyeExpression.value = getEyeExpression(properties.charAt(8))
    leftHoof.value = getLeftHoof(properties.charAt(9))

    //Set the description based on the pig.
    pig.description = "This " + pigName + " was generated with Chainlink VRF."
    //Set the external_url.
    pig.external_url = "https://www.degeneratefarm.io"
    //Set the animation_url. The file names of the nfts must be output first to get an immutable IPFS hash.
    pig.animation_url = "https://www.degeneratefarm.io/nfts/" + tokenID + ".html"
    //Set the image url.
    //pig.image = tokenID + ".png"
    //Set the NFT name.
    pig.name = "Pig #" + tokenID.substring(0, tokenID.length - 10)

    return { pig, nftHTML };
}

function validateTokenId(event) {
    if (!(event.pathParameters && event.pathParameters.tokenId)) {
        throw new Error("Missing 'tokenId' path parameter");
    }
    const tokenId = event.pathParameters.tokenId;
    if (tokenId.length <= 10) {
        throw new Error("Invalid 'tokenId'");
    }
    return tokenId;
}

module.exports = {
    buildMetadata,
    validateTokenId
}