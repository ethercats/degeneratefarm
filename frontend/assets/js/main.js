const polygonscanTx = 'https://polygonscan.com/tx/'
const polygonscanAccount = 'https://polygonscan.com/address/'
const openSeaLink = 'https://opensea.io/assets/matic/'
const alchemyProvider = 'wss://polygon-mainnet.g.alchemy.com/v2/IZQGe-YawoJnXEq48c2AWVN_BzYUto4k'
const contractAddress = "0x044C7c78d4179d820B18F217a594C4E366f57Bf2"
const imageURI = "assets/img/sprites/" //Test
//const imageURI = "nfts/pigs/img/" //Production
const mintPrice = 25000000000000000000
const upgradePrice = 2000000000000000000
var leaderboard = []
const contractNetwork = 137 //80001 and 0x13881 Mumbai Polygon Testnet, 137 and 0x89 Polygon Mainnet
var currentNetwork = null
var currentPig

$(function() {
    if (typeof ethereum !== 'undefined') {

        web3 = AlchemyWeb3.createAlchemyWeb3(alchemyProvider) //web3 = new Web3(window.ethereum)

        web3.eth.getAccounts((err, result) => {
            let rootAccount = result[0]
            if (err) {
                console.error('Failed to get root account.')
            }
            if (rootAccount == undefined) {
                console.error('Not connected to Web3.')
            }

            if (rootAccount == undefined && ethereum.selectedAddress !== null && currentNetwork == contractNetwork) {
                $("#loginText").html(ethereum.selectedAddress)
                $("#loginText").addClass('loggedIn')
                $("#connectButton").addClass('btn-success')
                $("#connectButton").html('Connected')
            }
            if (rootAccount == undefined && ethereum.selectedAddress !== null && currentNetwork != contractNetwork) {
                $("#loginText").html(ethereum.selectedAddress)
                $("#loginText").addClass('loggedIn')
                $("#connectButton").addClass('btn-warning')
                $("#connectButton").removeClass('btn-success')
                $("#connectButton").html('Change Network')
            }
        })
        /*********************************************************/
        /* Handle chain (network) and chainChanged, per EIP 1193 */
        /*********************************************************/

        ethereum
            .send("eth_chainId")
            .then((result) => {
                currentNetwork = web3.utils.hexToNumber(result.result)
                if (currentNetwork !== contractNetwork) {
                    $('#modal').modal('show')
                    $("#connectButton").addClass('btn-warning')
                    $("#connectButton").html('Change Network')
                    $("#networkErrorText").html('Switch to Polygon. Currently Web3 is connected to the ' + lookupChainID(currentNetwork) + '.')
                }

                if (currentNetwork == contractNetwork && ethereum.selectedAddress !== null) {
                    $("#loginText").html(ethereum.selectedAddress)
                    $("#loginText").addClass('loggedIn')
                    $("#connectButton").html('Connected')
                    $("#networkErrorText").html('')
                    $("#connectButton").removeClass('btn-warning')
                    $("#connectButton").addClass('btn-success')
                }
            })
            .catch(err => console.error(err))

        function lookupChainID(chainId) {
            switch (true) {
                case (chainId == 1):
                    return "Ethereum Mainnet"
                case (chainId == 2):
                    return "Morden Testnet"
                case (chainId == 3):
                    return "Ropsten Testnet"
                case (chainId == 4):
                    return "Rinkeby Testnet"
                case (chainId == 5):
                    return "Goerli Testnet"
                case (chainId == 80001):
                    return "Mumbai Testnet"
                case (chainId == 137):
                    return "Polygon Mainnet"
                case (chainId == 42):
                    return "Kovan Testnet"
                case (chainId == 63):
                    return "Mordor Testnet"
                case (chainId == 97):
                    return "BSC Testnet"
                case (chainId == 56):
                    return "BSC Mainnet"
                default:
                    return "the chain ID " + chainId
            }
        }

        ethereum.on('chainChanged', (chainId) => {
            currentNetwork = web3.utils.hexToNumber(chainId)
            if (currentNetwork !== contractNetwork) {
                $('#modal').modal('show')
                $("#connectButton").addClass('btn-warning')
                $("#connectButton").html('Change Network')
                $("#networkErrorText").html('Switch to Polygon. Currently Web3 is connected to the ' + lookupChainID(currentNetwork) + '.')

            }

            if (currentNetwork == contractNetwork && ethereum.selectedAddress !== null) {
                $('#modal').modal('hide')
                $("#loginText").html(ethereum.selectedAddress)
                $("#loginText").addClass('loggedIn')
                $("#connectButton").html('Connected')
                $("#networkErrorText").html('')
                $("#connectButton").removeClass('btn-warning')
                $("#connectButton").addClass('btn-success')
            }
        })

        /**********************************************************/
        /* Handle user accounts and accountsChanged, per EIP 1193 */
        /**********************************************************/

        ethereum
            .send("eth_accounts")
            .then((result) => {
                if (result.result[0] == undefined || result.result[0] == null) {
                    $("#loginText").html('You are currently not connected to Polygon Web3. Please connect to access functions.')
                    $("#loginText").removeClass('loggedIn')
                    $("#connectButton").removeClass('btn-success')
                    $("#connectButton").removeClass('btn-warning')
                    $("#connectButton").html('Connect to Web3')
                    $("#networkErrorText").html('')
                }

                if (web3.utils.isAddress(result.result[0]) == true) {


                    if (currentNetwork !== contractNetwork) {
                        $('#modal').modal('show')
                        $("#connectButton").addClass('btn-warning')
                        $("#connectButton").html('Change Network')
                        $("#networkErrorText").html('Switch to Polygon. Currently Web3 is connected to the ' + lookupChainID(currentNetwork) + '.')
                    }

                    if (currentNetwork !== contractNetwork && ethereum.selectedAddress !== null) {
                        $('#modal').modal('hide')
                        $("#loginText").html(ethereum.selectedAddress)
                        $("#loginText").addClass('loggedIn')
                        $("#connectButton").addClass('btn-warning')
                        $("#connectButton").removeClass('btn-success')
                        $("#connectButton").html('Change Network')
                        $("#networkErrorText").html('Switch to Polygon. Currently Web3 is connected to the ' + lookupChainID(currentNetwork) + '.')
                    }

                    if (currentNetwork == contractNetwork && ethereum.selectedAddress !== null) {
                        $('#modal').modal('hide')
                        $("#loginText").html(ethereum.selectedAddress)
                        $("#loginText").addClass('loggedIn')
                        $("#connectButton").html('Connected')
                        $("#networkErrorText").html('')
                        $("#connectButton").removeClass('btn-warning')
                        $("#connectButton").addClass('btn-success')
                        $("#networkErrorText").html('')
                    }
                }
            })
            .catch(err => {
                // In the future, maybe in 2020, this will return a 4100 error if
                // the user has yet to connect
                if (err.code === 4100) {
                    // EIP 1193 unauthorized error
                    console.log("Please connect to MetaMask.")
                } else {
                    console.error(err)
                }
            })

        // Note that this event is emitted on page load.
        // If the array of accounts is non-empty, you're already
        // connected.
        ethereum.on('accountsChanged', (accounts) => {
            console.log(accounts)
            if (accounts.length === 0) {
                // MetaMask is locked or the user has not connected any accounts
                console.log("Please connect to MetaMask.")
                $("#loginText").html('You are currently not connected to Polygon Web3. Please connect to access functions.')
                $("#loginText").removeClass('loggedIn')
                $("#connectButton").removeClass('btn-success')
                $("#connectButton").removeClass('btn-warning')
                $("#connectButton").html('Connect to Web3')
                $("#networkErrorText").html('')
            }
        })

        /***********************************/
        /* Handle connecting, per EIP 1102 */
        /***********************************/

        // You should only attempt to connect in response to user interaction,
        // such as a button click. Otherwise, you're popup-spamming the user
        // like it's 1999.
        // If you can't retrieve the user's account(s), you should encourage the user
        // to initiate a connection attempt.
        //document.getElementById("connectButton", connect)

        function connect() {
            ethereum
                .send("eth_requestAccounts")
                .then(function(result) {
                    if (currentNetwork !== contractNetwork) {
                        $("#loginText").html(ethereum.selectedAddress)
                        $("#loginText").addClass('loggedIn')
                        $('#modal').modal('show')
                        $("#connectButton").addClass('btn-warning')
                        $("#connectButton").html('Change Network')
                        $("#networkErrorText").html('Switch to Polygon. Currently Web3 is connected to the ' + lookupChainID(currentNetwork) + '.')
                    }

                    if (currentNetwork == contractNetwork) {
                        $("#loginText").html(ethereum.selectedAddress)
                        $("#loginText").addClass('loggedIn')
                        $("#connectButton").addClass('btn-success')
                        $("#connectButton").html('Connected')
                        $("#connectButton").removeClass('btn-warning')
                        $("#networkErrorText").html('')
                    }
                })
                .catch(err => {
                    if (err.code === 4001) {
                        $("#loginText").html('You are currently not connected to Polygon Web3. Please connect to access functions.')
                        $("#loginText").removeClass('loggedIn')
                        $("#connectButton").removeClass('btn-success')
                        $("#connectButton").removeClass('btn-warning')
                        $("#connectButton").html('Connect to Web3')
                        $("#networkErrorText").html('')
                        // EIP 1193 userRejectedRequest error.
                        console.log("Please connect to MetaMask.")
                    } else {
                        $("#loginText").html('You are currently not connected to Polygon Web3. Please connect to access functions.')
                        $("#loginText").removeClass('loggedIn')
                        $("#connectButton").removeClass('btn-success')
                        $("#connectButton").removeClass('btn-warning')
                        $("#connectButton").html('Connect to Web3')
                        $("#networkErrorText").html('')
                        console.log("Connect Error #2")
                    }
                })
        }
    } else {
        web3 = AlchemyWeb3.createAlchemyWeb3(alchemyProvider);
        $("#networkErrorText").html('Web3 wallet not found.')


    }

    $("#connectButton").click(() => {
        if ($("#connectButton").text() !== 'Connected' || $("#connectButton").text() !== 'Change Network') {
            connect()
        }
        console.log($("#connectButton").text())
    })

    const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "leftCard",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rightCard",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "isMint",
                "type": "bool"
            }
        ],
        "name": "HandDealt",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "newuri",
                "type": "string"
            }
        ],
        "name": "_setTokenUri",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "newcontractOwner",
                "type": "address"
            }
        ],
        "name": "changeContractOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "newPrice",
                "type": "uint256"
            }
        ],
        "name": "changePrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "newReceivingAddress",
                "type": "address"
            }
        ],
        "name": "changeReceivingAccount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "changeSaleState",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "newUpgradePrice",
                "type": "uint256"
            }
        ],
        "name": "changeUpgradePrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "changeUpgradeState",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contractOwner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "forSale",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenID",
                "type": "uint256"
            }
        ],
        "name": "getUpgrades",
        "outputs": [
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
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "lookupFullTokenID",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
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
        "name": "lookupTokenHistory",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "chipStack",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "plaqueStack",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalAces",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "matchingAces",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "diamondAces",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lastLeftCard",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lastRightCard",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "mint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "permanentlyStop",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "permanentlyStopMinting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "permanentlyStopUpgrades",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "permanentlyStopUpgrading",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "price",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "requestId",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "randomness",
                "type": "uint256"
            }
        ],
        "name": "rawFulfillRandomness",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "receiverAccount",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "_data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalHandsDealt",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenID",
                "type": "uint256"
            }
        ],
        "name": "totalStack",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenID",
                "type": "uint256"
            }
        ],
        "name": "upgrade",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "upgradeCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "upgradePrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "upgradeable",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawLink",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

    try {
        var deployedContract = new web3.eth.Contract(contractABI, contractAddress)
    } catch (err) {
        console.log(err)
    }

    var propertyValues
    var bgNumber
    var tailNumber
    var earsNumber
    var eyesNumber
    var faceNumber
    var teethNumber
    var tongueNumber
    var eyeExpressionNumber
    var leftHoofNumber
    var rightHoofNumber

    var chipsNumber
    var plaquesNumber
    var totalAces
    var matchingAces
    var diamondAces
    var leftCardNumber
    var rightCardNumber

    var bg = document.getElementById("bg")
    var tail = document.getElementById("tail")
    var ears = document.getElementById("ears")
    var eyes = document.getElementById("eyes")
    var bodyRightHoof = document.getElementById("body-right-hoof")
    var teeth = document.getElementById("teeth")
    var tongue = document.getElementById("tongue")
    var eyeExpression = document.getElementById("eye-expression")
    var leftHoof = document.getElementById("left-hoof")
    var chips = document.getElementById("chips")
    var plaques = document.getElementById("plaques")
    var leftCard = document.getElementById("left-card")
    var rightCard = document.getElementById("right-card")
    var spinner = document.getElementById("spinner")

    //Load a default  
    spinner.src = "spinner.png"

    function buildAnimal(tokenID, tokenNumber, random) {
        if (tokenID == 0) {
            console.log('modal')
            return
        }
        propertyValues = tokenID.slice(-10)
        bgNumber = propertyValues.charAt(0)
        tailNumber = propertyValues.charAt(1)
        earsNumber = propertyValues.charAt(2)
        eyesNumber = propertyValues.charAt(3)
        bodyRightHoofNumber = propertyValues.substr(4, 2)
        teethNumber = propertyValues.charAt(6)
        tongueNumber = propertyValues.charAt(7)
        eyeExpressionNumber = propertyValues.charAt(8)
        leftHoofNumber = propertyValues.charAt(9)

        deployedContract.methods.getUpgrades(tokenID).call({})
            .then(function(result) {
                console.log(result)
                let props = result
                chipsNumber = parseInt(props[0])
                plaquesNumber = parseInt(props[1])
                totalAces = parseInt(props[2])
                matchingAces = parseInt(props[3])
                diamondAces = parseInt(props[4])
                leftCardNumber = parseInt(props[5])
                rightCardNumber = parseInt(props[6])
                let chipStack = chipLookup(chipsNumber) + (plaquesNumber * 25000)
                bg.src = imageURI + "bg/" + bgNumber + ".png"
                tail.src = imageURI + "tail/" + tailNumber + ".png"
                ears.src = imageURI + "ears/" + earsNumber + ".png"
                eyes.src = imageURI + "eyes/" + eyesNumber + ".png"
                bodyRightHoof.src = imageURI + "body-right-hoof/" + bodyRightHoofNumber + ".png"
                teeth.src = imageURI + "teeth/" + teethNumber + ".png"
                tongue.src = imageURI + "tongue/" + tongueNumber + ".png"
                eyeExpression.src = imageURI + "eye-expression/" + eyeExpressionNumber + ".png"
                leftHoof.src = imageURI + "left-hoof/" + leftHoofNumber + ".png"
                chips.src = imageURI + "chips/" + chipsNumber + ".png"
                plaques.src = imageURI + "plaques/" + plaquesNumber + ".png"
                leftCard.src = imageURI + "left-card/" + leftCardNumber + ".png"
                rightCard.src = imageURI + "right-card/" + rightCardNumber + ".png"
                if (random === false) {
                    $("#animalNumberTitle").html("Pig #" + tokenNumber)
                }
                $("#chip-stack").html(delimitInt(chipStack) + " Chips")
                $("#total-aces").html(props[2] + " Total AA - " + props[3] + " Matching AA - " + props[4] + " Diamond AA")
                $("#info-links").html("<a href='" + openSeaLink + contractAddress + "/" + tokenID + "'>View on OpenSea</a>")
                document.querySelector('#spinner').classList.add("loaded")
                console.log("Chips: " + props[0], "| Plaques: " + props[1], "| Total Aces: " + props[2], "| Matching Aces: " + props[3], "| Diamond Aces: " + props[4], "| Left Card: " + cardName(props[5]), "| Right Card: " + cardName(props[6]))
            })
            .catch(spinnerAdd())
    }

    function chipLookup(chips) {
        if (chips <= 100) return 1000 * chips;
        else if (chips >= 101) return (5000 * (chips - 100)) + 100000;
        else return 0;
    }

    function delimitInt(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function mint() {
        deployedContract.methods.mint().send({
            from: ethereum.selectedAddress,
            to: contractAddress,
            value: mintPrice
        }, (err, tx) => {
            console.log(err, tx)
        })
    }

    function upgrade(tokenID) {
        console.log("Upgrading Token #" + tokenID)
        deployedContract.methods.upgrade(tokenID).send({
            from: ethereum.selectedAddress,
            to: contractAddress,
            value: upgradePrice
        }, (err, tx) => {
            console.log(err, tx)
        })
    }

    $("#animalNumber").on('keyup', function() {
        let tokenID = $("#animalNumber").val()
        $("#upgradeButton").html("Upgrade Pig #" + tokenID)
        $("#upgradeButton").addClass('disabled')
        $("#upgradeButton").prop('disabled', true)
    })

    $("#viewAnimalButton").click(() => {
        let tokenID = $("#animalNumber").val()
        if (tokenID.toString().length >= 1 && tokenID.toString().length <= 4) {
            deployedContract.methods.lookupFullTokenID(tokenID).call({})
                .then(function(result) {
                    $("#upgradeButton").html("Upgrade Pig #" + tokenID)
                    $("#upgradeButton").removeClass('disabled')
                    $("#upgradeButton").prop('disabled', false)
                    //We track this in order to automatically update the pig on the frontend if it is already displayed when an upgrade event comes in.
                    currentPig = result
                    buildAnimal(result, tokenID, false)
                    deployedContract.methods.ownerOf(result).call({})
                        .then(function(owner) {
                            console.log(ethereum.selectedAddress.toLowerCase(), owner.toLowerCase())
                            if (ethereum.selectedAddress.toLowerCase() == owner.toLowerCase()) {
                                $("#owned-pig").html("Pig #" + tokenID + " Is Owned By")
                                $("#owned-by").html("You own this pig!")
                            } else {
                                $("#owned-pig").html("Pig #" + tokenID + " Is Owned By")
                                $("#owned-by").html(owner)
                                $("#upgradeButton").addClass('disabled')
                                $("#upgradeButton").prop('disabled', true)
                            }
                        })
                })
        }
    })

    $("#mintButton").click(() => {
        if (currentNetwork !== contractNetwork) {
            $('#modal').modal('show')
            return
        }
        mint()
    })

    $("#closebtn").click(() => {
        $('#modal').modal('hide')
    })

    $("#upgradeButton").click(() => {
        //console.log($("#animalNumber").val())
        if (currentNetwork !== contractNetwork) {
            $('#modal').modal('show')
            return
        }
        deployedContract.methods.lookupFullTokenID($("#animalNumber").val()).call({})
            .then(function(result) {
                upgrade(result)
            })
    })

    function spinnerAdd() {
        spinner.src = ""
    }

    function spinnerRemove() {
        spinner.src = "spinner.png"
    }

    function buildRandomAnimal() {
        deployedContract.methods.totalSupply().call({})
            .then(function(result) {
                let tokenID = Math.floor(Math.random() * result) + 1
                deployedContract.methods.lookupFullTokenID(tokenID).call({})
                    .then(function(result) {
                        let fullTokenID = result
                        buildAnimal(fullTokenID, tokenID, true)
                        $("#animalNumberTitle").html("Random Pig (#" + tokenID + ")")
                    })
            })
            .catch(spinnerAdd())
    }

    buildRandomAnimal()

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

    function listenForEvents() {
        deployedContract.events.Transfer({
            filter: { from: 0 }, //Mints are all transfer events, but coming from the blackhole address (from: 0)
            fromBlock: 'latest'
        }).on('data', async function(event) {
            console.log(event)
            console.log(event.returnValues.from, ethereum.selectedAddress, event.returnValues.to)
            if (event.returnValues.from == "0x0000000000000000000000000000000000000000" && ethereum.selectedAddress.toLowerCase() == event.returnValues.to.toLowerCase()) {
                let tokenIDfromMint = event.returnValues.tokenId
                console.log('Mint Event Received')
                buildAnimal(tokenIDfromMint, tokenIDfromMint.substring(0, tokenIDfromMint.length - 10), false)
                //Visually pulse the update coming in.
                flashMint()
            }
            deployedContract.methods.totalSupply().call({})
                .then(function(result) {
                    $("#totalPigs").html(result)
                    $("#totalPigsLeft").html(1024 - result + " Pigs Left")
                })
        }).on('error', console.error);

        deployedContract.events.HandDealt({
            fromBlock: 'latest'
        }).on('data', async function(event) {
            if (currentPig == event.returnValues.tokenID) {
                console.log(event)
                let tokenIDtoUpdate = event.returnValues.tokenID
                console.log('Update Event Received')
                buildAnimal(tokenIDtoUpdate, tokenIDtoUpdate.substring(0, tokenIDtoUpdate.length - 10), false)
                //Visually pulse the update coming in.
                flashUpdate()
            }
            deployedContract.methods.totalHandsDealt().call({})
                .then(function(result) {
                    $("#totalHands").html(result)
                })
        }).on('error', console.error)
    }

    listenForEvents()

    deployedContract.methods.totalHandsDealt().call({})
        .then(function(result) {
            $("#totalHands").html(result)
        })

    //Hard code once sold out
    deployedContract.methods.totalSupply().call({})
        .then(function(result) {
            $("#totalPigs").html(result)
            $("#totalPigsLeft").html(1024 - result + " Pigs Left")
        })

    $.ajax({
        type: "GET",
        url: "https://www.degeneratefarm.io/leaderboard.php",
        cache: false,
        success: function(response) {
            leaderboard.push(JSON.parse(response))
            for (i = 0; i < leaderboard[0].length; i++) {
                const row = `
    <tr id="${"leader-row-" + i}" class="text-center">
      <td class="table-title-text text-center"><a class="table-title-text" href="${openSeaLink + contractAddress + "/" + leaderboard[0][i].pig}">${"Pig #" + leaderboard[0][i].pig.substring(0, leaderboard[0][i].pig.length-10)}</a></td>
      <td class="stacktext text-center">${leaderboard[0][i].stacksize}</td>
    </tr>
    `;
                $('#leaders tbody').append(row);
            }
        }
    })
    //End Document Ready
})

function flashMint() {
    $("#alert-border").attr("src", imageURI + "alert.png")
    $("#alert-border").fadeTo(300, 0, function() {
        $("#alert-border").css('opacity', '1')
        $("#alert-border").fadeTo(500, 0, function() {
            $("#alert-border").css('opacity', '1')
            $("#alert-border").fadeTo(300, 0, function() {
                $("#alert-border").css('opacity', '1')
                $("#alert-border").fadeTo(1200, 0, function() {
                    $("#alert-border").attr("src", "")
                    $("#alert-border").css('opacity', '1')
                })
            })
        })
    })
}

function flashUpdate() {
    $("#alert-border").attr("src", imageURI + "alert.png")
    $("#alert-border").fadeTo(1200, 0, function() {
        $("#alert-border").attr("src", "")
        $("#alert-border").css('opacity', '1')
    })
}