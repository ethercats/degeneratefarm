const alchemyProvider = 'https://polygon-mumbai.g.alchemy.com/v2/IZQGe-YawoJnXEq48c2AWVN_BzYUto4k'
var nullCheck = false
const chainId = 80001 //chainId as an integer
const contractAddress = "0xd2A8937B584450eD8daEF9DeEeCdED63072259f6"
const path = window.location.pathname.split("/").pop()
const tokenID = path.slice(0, path.lastIndexOf('.'))
const propertyValues = tokenID.slice(-10)
const bgNumber = propertyValues.charAt(0)
const tailNumber = propertyValues.charAt(1)
const earsNumber = propertyValues.charAt(2)
const eyesNumber = propertyValues.charAt(3)
const bodyRightHoofNumber = propertyValues.substr(4, 2)
const teethNumber = propertyValues.charAt(6)
const tongueNumber = propertyValues.charAt(7)
const eyeExpressionNumber = propertyValues.charAt(8)
const leftHoofNumber = propertyValues.charAt(9)

var chipsNumber
var plaquesNumber
var totalAces
var matchingAces
var diamondAces
var leftCardNumber
var rightCardNumber
const bg = document.getElementById("bg")
const tail = document.getElementById("tail")
const ears = document.getElementById("ears")
const eyes = document.getElementById("eyes")
const bodyRightHoof = document.getElementById("body-right-hoof")
const teeth = document.getElementById("teeth")
const tongue = document.getElementById("tongue")
const eyeExpression = document.getElementById("eye-expression")
const leftHoof = document.getElementById("left-hoof")
const chips = document.getElementById("chips")
const plaques = document.getElementById("plaques")
const leftCard = document.getElementById("left-card")
const rightCard = document.getElementById("right-card")
const acesSpan = document.getElementById("acesTotal")

window.addEventListener('load', function() {
    web3 = AlchemyWeb3.createAlchemyWeb3(alchemyProvider);
    const contractABI = [{
        "inputs": [{
            "internalType": "uint256",
            "name": "tokenID",
            "type": "uint256"
        }],
        "name": "getUpgrades",
        "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }]

    try {
        var deployedContract = new web3.eth.Contract(contractABI, contractAddress)
    } catch (err) {
        console.log(err)
    }

    deployedContract.methods.getUpgrades(tokenID).call({})
        .then(function(result) {
            let props = result
            chipsNumber = parseInt(props[0])
            plaquesNumber = parseInt(props[1])
            totalAces = parseInt(props[2])
            matchingAces = parseInt(props[3])
            diamondAces = parseInt(props[4])
            leftCardNumber = parseInt(props[5])
            rightCardNumber = parseInt(props[6])
            let chipStack = chipLookup(chipsNumber) + (plaquesNumber * 25000)
            bg.src = "./img/bg/" + bgNumber + ".png"
            tail.src = "./img/tail/" + tailNumber + ".png"
            ears.src = "./img/ears/" + earsNumber + ".png"
            eyes.src = "./img/eyes/" + eyesNumber + ".png"
            bodyRightHoof.src = "./img/body-right-hoof/" + bodyRightHoofNumber + ".png"
            teeth.src = "./img/teeth/" + teethNumber + ".png"
            tongue.src = "./img/tongue/" + tongueNumber + ".png"
            eyeExpression.src = "./img//eye-expression/" + eyeExpressionNumber + ".png"
            leftHoof.src = "./img/left-hoof/" + leftHoofNumber + ".png"
            chips.src = "./img/chips/" + chipsNumber + ".png"
            plaques.src = "./img/plaques/" + plaquesNumber + ".png"
            leftCard.src = "./img/left-card/" + leftCardNumber + ".png"
            rightCard.src = "./img/right-card/" + rightCardNumber + ".png"
            acesText = delimitInt(chipStack) + " " + totalAces + "T " + matchingAces + "M " + diamondAces + "D"
            acesSpan.textContent = acesText
            document.querySelector('.preloader').classList.add("loaded")
            console.log("Chips: " + props[0], "| Plaques: " + props[1], "| Total Aces: " + props[2], "| Matching Aces: " + props[3], "| Diamond Aces: " + props[4], "| Left Card: " + cardName(props[5]), "| Right Card: " + cardName(props[6]))
        })
})

function chipLookup(chips) {
    if (chips <= 100) return 1000 * chips;
    else if (chips >= 101) return (5000 * (chips - 100)) + 100000;
    else return 0;
}

function delimitInt(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function cardName(n) {
    switch (true) {
        case (n == 1):
            return "Ac"
        case (n == 2):
            return "2c"
        case (n == 3):
            return "3c"
        case (n == 4):
            return "4c"
        case (n == 5):
            return "5c"
        case (n == 6):
            return "6c"
        case (n == 7):
            return "7c"
        case (n == 8):
            return "8c"
        case (n == 9):
            return "9c"
        case (n == 10):
            return "10c"
        case (n == 11):
            return "Jc"
        case (n == 12):
            return "Qc"
        case (n == 13):
            return "Kc"
        case (n == 14):
            return "Ad"
        case (n == 15):
            return "2d"
        case (n == 16):
            return "3d"
        case (n == 17):
            return "4d"
        case (n == 18):
            return "5d"
        case (n == 19):
            return "6d"
        case (n == 20):
            return "7d"
        case (n == 21):
            return "8d"
        case (n == 22):
            return "9d"
        case (n == 23):
            return "10d"
        case (n == 24):
            return "Jd"
        case (n == 25):
            return "Qd"
        case (n == 26):
            return "Kd"
        case (n == 27):
            return "Ah"
        case (n == 28):
            return "2h"
        case (n == 29):
            return "3h"
        case (n == 30):
            return "4h"
        case (n == 31):
            return "5h"
        case (n == 32):
            return "6h"
        case (n == 33):
            return "7h"
        case (n == 34):
            return "8h"
        case (n == 35):
            return "9h"
        case (n == 36):
            return "10h"
        case (n == 37):
            return "Jh"
        case (n == 38):
            return "Qh"
        case (n == 39):
            return "Kh"
        case (n == 40):
            return "As"
        case (n == 41):
            return "2s"
        case (n == 42):
            return "3s"
        case (n == 43):
            return "4s"
        case (n == 44):
            return "5s"
        case (n == 45):
            return "6s"
        case (n == 46):
            return "7s"
        case (n == 47):
            return "8s"
        case (n == 48):
            return "9s"
        case (n == 49):
            return "10s"
        case (n == 50):
            return "Js"
        case (n == 51):
            return "Qs"
        case (n == 52):
            return "Ks"
    }
}