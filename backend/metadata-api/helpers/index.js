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
        //Pig Jong Un
        case (n == "00"):
            pigName = "Pig Jong Un"
            return "Empty"
        case (n == "01"):
            pigName = "Pig Jong Un"
            return "Cheeseburger"
        case (n == "02"):
            pigName = "Pig Jong Un"
            return "French Fries"
        case (n == "03"):
            pigName = "Pig Jong Un"
            return "Cigarette"
        case (n == "04"):
            pigName = "Pig Jong Un"
            return "Lollipop"
        case (n == "05"):
            pigName = "Pig Jong Un"
            return "Ice Cream"
        case (n == "06"):
            pigName = "Pig Jong Un"
            return "Blueberry Muffin"
        case (n == "07"):
            pigName = "Pig Jong Un"
            return "Cookie"
        case (n == "08"):
            pigName = "Pig Jong Un"
            return "Cake"
        case (n == "09"):
            pigName = "Pig Jong Un"
            return "Bratwurst"
            //Donald Oinkler
        case (n == "10"):
            pigName = "Donald Oinkler"
            return "Empty"
        case (n == "11"):
            pigName = "Donald Oinkler"
            return "Cheeseburger"
        case (n == "12"):
            pigName = "Donald Oinkler"
            return "French Fries"
        case (n == "13"):
            pigName = "Donald Oinkler"
            return "Cigarette"
        case (n == "14"):
            pigName = "Donald Oinkler"
            return "Lollipop"
        case (n == "15"):
            pigName = "Donald Oinkler"
            return "Ice Cream"
        case (n == "16"):
            pigName = "Donald Oinkler"
            return "Blueberry Muffin"
        case (n == "17"):
            pigName = "Donald Oinkler"
            return "Cookie"
        case (n == "18"):
            pigName = "Donald Oinkler"
            return "Cake"
        case (n == "19"):
            pigName = "Donald Oinkler"
            return "Bratwurst"
            //Che Chicharrón
        case (n == "20"):
            pigName = "Che Chicharrón"
            return "Empty"
        case (n == "21"):
            pigName = "Che Chicharrón"
            return "Cigar Stump"
        case (n == "22"):
            pigName = "Che Chicharrón"
            return "Red Label Cigar"
        case (n == "23"):
            pigName = "Che Chicharrón"
            return "Unlit Cigar"
        case (n == "24"):
            pigName = "Che Chicharrón"
            return "Black Label Cigar"
        case (n == "25"):
            pigName = "Che Chicharrón"
            return "Baseball"
        case (n == "26"):
            pigName = "Che Chicharrón"
            return "Natural Bat"
        case (n == "27"):
            pigName = "Che Chicharrón"
            return "Mahogany Bat"
        case (n == "28"):
            pigName = "Che Chicharrón"
            return "Silver Bat"
        case (n == "29"):
            pigName = "Che Chicharrón"
            return "Gold Bat"
            //Jamón Castro
        case (n == "30"):
            pigName = "Jamón Castro"
            return "Empty"
        case (n == "31"):
            pigName = "Jamón Castro"
            return "Cigar Stump"
        case (n == "32"):
            pigName = "Jamón Castro"
            return "Red Label Cigar"
        case (n == "33"):
            pigName = "Jamón Castro"
            return "Unlit Cigar"
        case (n == "34"):
            pigName = "Jamón Castro"
            return "Black Label Cigar"
        case (n == "35"):
            pigName = "Jamón Castro"
            return "Baseball"
        case (n == "36"):
            pigName = "Jamón Castro"
            return "Natural Bat"
        case (n == "37"):
            pigName = "Jamón Castro"
            return "Mahogany Bat"
        case (n == "38"):
            pigName = "Jamón Castro"
            return "Silver Bat"
        case (n == "39"):
            pigName = "Jamón Castro"
            return "Gold Bat"
            //Augusto Cochinillo
        case (n == "40"):
            pigName = "Augusto Cochinillo"
            return "Empty"
        case (n == "41"):
            pigName = "Augusto Cochinillo"
            return "Cigar Stump"
        case (n == "42"):
            pigName = "Augusto Cochinillo"
            return "Red Label Cigar"
        case (n == "43"):
            pigName = "Augusto Cochinillo"
            return "Unlit Cigar"
        case (n == "44"):
            pigName = "Augusto Cochinillo"
            return "Black Label Cigar"
        case (n == "45"):
            pigName = "Augusto Cochinillo"
            return "Baseball"
        case (n == "46"):
            pigName = "Augusto Cochinillo"
            return "Natural Bat"
        case (n == "47"):
            pigName = "Augusto Cochinillo"
            return "Mahogany Bat"
        case (n == "48"):
            pigName = "Augusto Cochinillo"
            return "Silver Bat"
        case (n == "49"):
            pigName = "Augusto Cochinillo"
            return "Gold Bat"
            //Hugo Oincéz
        case (n == "50"):
            pigName = "Hugo Oincéz"
            return "Empty"
        case (n == "51"):
            pigName = "Hugo Oincéz"
            return "Cigar Stump"
        case (n == "52"):
            pigName = "Hugo Oincéz"
            return "Red Label Cigar"
        case (n == "53"):
            pigName = "Hugo Oincéz"
            return "Unlit Cigar"
        case (n == "54"):
            pigName = "Hugo Oincéz"
            return "Black Label Cigar"
        case (n == "55"):
            pigName = "Hugo Oincéz"
            return "Baseball"
        case (n == "56"):
            pigName = "Hugo Oincéz"
            return "Natural Bat"
        case (n == "57"):
            pigName = "Hugo Oincéz"
            return "Mahogany Bat"
        case (n == "58"):
            pigName = "Hugo Oincéz"
            return "Silver Bat"
        case (n == "59"):
            pigName = "Hugo Oincéz"
            return "Gold Bat"
            //Leonid Bacon
        case (n == "60"):
            pigName = "Leonid Bacon"
            return "Empty"
        case (n == "61"):
            pigName = "Leonid Bacon"
            return "Cigar Stump"
        case (n == "62"):
            pigName = "Leonid Bacon"
            return "Red Label Cigar"
        case (n == "63"):
            pigName = "Leonid Bacon"
            return "Unlit Cigar"
        case (n == "64"):
            pigName = "Leonid Bacon"
            return "Black Label Cigar"
        case (n == "65"):
            pigName = "Leonid Bacon"
            return "Baseball"
        case (n == "66"):
            pigName = "Leonid Bacon"
            return "Natural Bat"
        case (n == "67"):
            pigName = "Leonid Bacon"
            return "Mahogany Bat"
        case (n == "68"):
            pigName = "Leonid Bacon"
            return "Silver Bat"
        case (n == "69"):
            pigName = "Leonid Bacon"
            return "Gold Bat"
            //Joseph Snortin
        case (n == "70"):
            pigName = "Joseph Snortin"
            return "Empty"
        case (n == "71"):
            pigName = "Joseph Snortin"
            return "Cigar Stump"
        case (n == "72"):
            pigName = "Joseph Snortin"
            return "Red Label Cigar"
        case (n == "73"):
            pigName = "Joseph Snortin"
            return "Unlit Cigar"
        case (n == "74"):
            pigName = "Joseph Snortin"
            return "Black Label Cigar"
        case (n == "75"):
            pigName = "Joseph Snortin"
            return "Baseball"
        case (n == "76"):
            pigName = "Joseph Snortin"
            return "Natural Bat"
        case (n == "77"):
            pigName = "Joseph Snortin"
            return "Mahogany Bat"
        case (n == "78"):
            pigName = "Joseph Snortin"
            return "Silver Bat"
        case (n == "79"):
            pigName = "Joseph Snortin"
            return "Gold Bat"
            //Queen Swill II
        case (n == "80"):
            pigName = "Queen Swill II"
            return "Empty"
        case (n == "81"):
            pigName = "Queen Swill II"
            return "Cigar Stump"
        case (n == "82"):
            pigName = "Queen Swill II"
            return "Red Label Cigar"
        case (n == "83"):
            pigName = "Queen Swill II"
            return "Unlit Cigar"
        case (n == "84"):
            pigName = "Queen Swill II"
            return "Black Label Cigar"
        case (n == "85"):
            pigName = "Queen Swill II"
            return "Baseball"
        case (n == "86"):
            pigName = "Queen Swill II"
            return "Natural Bat"
        case (n == "87"):
            pigName = "Queen Swill II"
            return "Mahogany Bat"
        case (n == "88"):
            pigName = "Queen Swill II"
            return "Silver Bat"
        case (n == "89"):
            pigName = "Queen Swill II"
            return "Gold Bat"
            //Napoleon Saveloy
        case (n == "90"):
            pigName = "Napoleon Saveloy"
            return "Empty"
        case (n == "91"):
            pigName = "Napoleon Saveloy"
            return "Cigar Stump"
        case (n == "92"):
            pigName = "Napoleon Saveloy"
            return "Red Label Cigar"
        case (n == "93"):
            pigName = "Napoleon Saveloy"
            return "Unlit Cigar"
        case (n == "94"):
            pigName = "Napoleon Saveloy"
            return "Black Label Cigar"
        case (n == "95"):
            pigName = "Napoleon Saveloy"
            return "Baseball"
        case (n == "96"):
            pigName = "Napoleon Saveloy"
            return "Natural Bat"
        case (n == "97"):
            pigName = "Napoleon Saveloy"
            return "Mahogany Bat"
        case (n == "98"):
            pigName = "Napoleon Saveloy"
            return "Silver Bat"
        case (n == "99"):
            pigName = "Napoleon Saveloy"
            return "Gold Bat"
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

function getPigFileName(n) {

    switch (true) {
        case (n == "Pig Jong Un"):
            return "pig-jong-un.png"
        case (n == "Donald Oinkler"):
            return "donald-oinkler.png"
        case (n == "Che Chicharrón"):
            return "che-chicharron.png"
        case (n == "Jamón Castro"):
            return "jamon-castro.png"
        case (n == "Augusto Cochinillo"):
            return "augusto-cochinillo.png"
        case (n == "Hugo Oincéz"):
            return "hugo-oincez.png"
        case (n == "Leonid Bacon"):
            return "leonid-bacon.png"
        case (n == "Joseph Snortin"):
            return "joseph-snortin.png"
        case (n == "Queen Swill II"):
            return "queen-swill-ii.png"
        case (n == "Napoleon Saveloy"):
            return "napoleon-saveloy.png"
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
    pig.description = "This " + pigName + ", and its 10 visually variable traits were generated with Chainlink VRF at the time of minting. The chip stack and cards are subject to change based on upgrades. All upgrades are performed via Chainlink VRF."
    //Set the external_url.
    pig.external_url = "https://www.degeneratefarm.io"
    //Set the animation_url.
    pig.animation_url = "https://www.degeneratefarm.io/nfts/pigs/" + tokenID + ".html"
    //Set the image url.
    pig.image = "https://www.degeneratefarm.io/nfts/pigs/" + getPigFileName(pigName)
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