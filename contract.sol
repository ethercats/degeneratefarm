/**
 * OpenZepplin contracts contained within are licensed under an MIT License.
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016-2021 zOS Global Limited
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 * Chainlink contracts contained within are licensed under an MIT License.
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2018-2021 SmartContract ChainLink, Ltd.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/contracts/src/v0.8/VRFConsumerBase.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/token/ERC721/IERC721.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/token/ERC721/IERC721Receiver.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/utils/Address.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/utils/Context.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/utils/Strings.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/utils/introspection/ERC165.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/security/ReentrancyGuard.sol";

/**
 * @dev Implementation of https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard, including
 * the Metadata extension, but not including the Enumerable extension, which is available separately as
 * {ERC721Enumerable}.
 */
contract ERC721 is Context, ERC165, IERC721, IERC721Metadata {
    using Address for address;
    using Strings for uint256;

    // Token name
    string private _name = "DegenerateFarm.io";

    // Token symbol
    string private _symbol =  "DEGEN";
    
    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;

    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    
    // Token URI for fetching metadata
    string internal baseURI;

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC721-balanceOf}.
     */
    function balanceOf(address owner) public view virtual override returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");
        return _balances[owner];
    }

    /**
     * @dev See {IERC721-ownerOf}.
     */
    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }

    /**
     * @dev See {IERC721Metadata-name}.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev See {IERC721Metadata-symbol}.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return string(abi.encodePacked(baseURI, tokenId.toString()));
    }


    /**
     * @dev See {IERC721-approve}.
     */
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ERC721.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(
            _msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _approve(to, tokenId);
    }

    /**
     * @dev See {IERC721-getApproved}.
     */
    function getApproved(uint256 tokenId) public view virtual override returns (address) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");

        return _tokenApprovals[tokenId];
    }

    /**
     * @dev See {IERC721-setApprovalForAll}.
     */
    function setApprovalForAll(address operator, bool approved) public virtual override {
        require(operator != _msgSender(), "ERC721: approve to caller");

        _operatorApprovals[_msgSender()][operator] = approved;
        emit ApprovalForAll(_msgSender(), operator, approved);
    }

    /**
     * @dev See {IERC721-isApprovedForAll}.
     */
    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    /**
     * @dev See {IERC721-transferFrom}.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

        _transfer(from, to, tokenId);
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeTransfer(from, to, tokenId, _data);
    }

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * `_data` is additional data, it has no specified format and it is sent in call to `to`.
     *
     * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
     * implement alternative mechanisms to perform token transfer, such as signature-based.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _transfer(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");
    }

    /**
     * @dev Returns whether `tokenId` exists.
     *
     * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
     *
     * Tokens start existing when they are minted (`_mint`),
     * and stop existing when they are burned (`_burn`).
     */
    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners[tokenId] != address(0);
    }

    /**
     * @dev Returns whether `spender` is allowed to manage `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = ERC721.ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

    /**
     * @dev Safely mints `tokenId` and transfers it to `to`.
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeMint(address to, uint256 tokenId) internal virtual {
        _safeMint(to, tokenId, "");
    }

    /**
     * @dev Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is
     * forwarded in {IERC721Receiver-onERC721Received} to contract recipients.
     */
    function _safeMint(
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _mint(to, tokenId);
        require(
            _checkOnERC721Received(address(0), to, tokenId, _data),
            "ERC721: transfer to non ERC721Receiver implementer"
        );
    }

    /**
     * @dev Mints `tokenId` and transfers it to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - `to` cannot be the zero address.
     *
     * Emits a {Transfer} event.
     */
    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _beforeTokenTransfer(address(0), to, tokenId);

        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(address(0), to, tokenId);
    }

    /**
     * @dev Destroys `tokenId`.
     * The approval is cleared when the token is burned.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     * Emits a {Transfer} event.
     */
    function _burn(uint256 tokenId) internal virtual {
        address owner = ERC721.ownerOf(tokenId);

        _beforeTokenTransfer(owner, address(0), tokenId);

        // Clear approvals
        _approve(address(0), tokenId);

        _balances[owner] -= 1;
        delete _owners[tokenId];

        emit Transfer(owner, address(0), tokenId);
    }

    /**
     * @dev Transfers `tokenId` from `from` to `to`.
     *  As opposed to {transferFrom}, this imposes no restrictions on msg.sender.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     *
     * Emits a {Transfer} event.
     */
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {
        require(ERC721.ownerOf(tokenId) == from, "ERC721: transfer of token that is not owned");
        require(to != address(0), "ERC721: transfer to the zero address");

        _beforeTokenTransfer(from, to, tokenId);

        // Clear approvals from the previous owner
        _approve(address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    /**
     * @dev Approve `to` to operate on `tokenId`
     *
     * Emits a {Approval} event.
     */
    function _approve(address to, uint256 tokenId) internal virtual {
        _tokenApprovals[tokenId] = to;
        emit Approval(ERC721.ownerOf(tokenId), to, tokenId);
    }

    /**
     * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
     * The call is not executed if the target address is not a contract.
     *
     * @param from address representing the previous owner of the given token ID
     * @param to target address that will receive the tokens
     * @param tokenId uint256 ID of the token to be transferred
     * @param _data bytes optional data to send along with the call
     * @return bool whether the call correctly returned the expected magic value
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) private returns (bool) {
        if (to.isContract()) {
            try IERC721Receiver(to).onERC721Received(_msgSender(), from, tokenId, _data) returns (bytes4 retval) {
                return retval == IERC721Receiver.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("ERC721: transfer to non ERC721Receiver implementer");
                } else {
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}
}

//How many deer does it take to build a space shuttle? -Nadia Khuzina
contract DegeneratePigs is VRFConsumerBase, ERC721, ReentrancyGuard {
    address public contractOwner;
    bytes32 internal keyHash = 0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da;
    address internal vrfCoordinator = 0x3d2341ADb2D31f1c5530cDC622016af293177AE0;
    address internal linkTokenAddress = 0xb0897686c545045aFc77CF20eC7A532E3120E0F1;
    uint256 internal fee;
    address payable public receiverAccount;
    uint256 public price;
    uint256 public upgradePrice;
    uint256 internal totalNFTs;
    uint256 public totalHandsDealt;
    bool public forSale;
    bool public permanentlyStop;
    bool public upgradeable;
    bool public permanentlyStopUpgrades;

    struct tokenHistory {
        uint256 chipStack;
        uint256 plaqueStack;
        uint256 totalAces;
        uint256 matchingAces;
        uint256 diamondAces;
        uint256 lastLeftCard;
        uint256 lastRightCard;
    }

    //Track the hands for statistical analysis or frontend purposes.
    event HandDealt(uint256 indexed tokenID, uint256 leftCard, uint256 rightCard, bool isMint);

    mapping(bytes32 => address) internal minterAddress;
    mapping(bytes32 => uint256) internal tokenToUpgrade;
    mapping(uint256 => uint256) public lookupFullTokenID;
    mapping(uint256 => uint256) public upgradeCount;
    mapping(uint256 => tokenHistory[]) public lookupTokenHistory;
    mapping(uint256 => uint256) internal chipStack;
    mapping(uint256 => uint256) internal plaqueStack;
    mapping(uint256 => uint256) internal totalAces;
    mapping(uint256 => uint256) internal matchingAces;
    mapping(uint256 => uint256) internal diamondAces;
    mapping(uint256 => uint256) internal lastLeftCard;
    mapping(uint256 => uint256) internal lastRightCard;

    constructor()
    VRFConsumerBase(
        vrfCoordinator,
        linkTokenAddress
    ) {
        contractOwner = msg.sender;
        receiverAccount = payable(msg.sender);
        fee = 0.0001 * 10 ** 18;
        price = 25 * 10 ** 18;
        upgradePrice = 2 * 10 ** 18;
        baseURI = "https://wwww.degeneratefarm.io/metadata/";
    }

    //Reduces require() statements that would increase verbosity.
    modifier onlyOwner() {
        require(msg.sender == contractOwner);
        _;
    }

    //We need separate mappings for mints and upgrades to differentiate them in the fulfillRandomness function.
    function getRandomNumberForMint() internal returns(bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK. Topup the contract with LINK.");
        requestId = requestRandomness(keyHash, fee);
        minterAddress[requestId] = msg.sender;
        return requestId;
    }

    //We need separate mappings for mints and upgrades to differentiate them in the fulfillRandomness function.
    function getRandomNumberForUpgrade(uint256 tokenID) internal returns(bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "There are no pigs left to mint, sorry. :-(");
        requestId = requestRandomness(keyHash, fee);
        tokenToUpgrade[requestId] = tokenID;
        return requestId;
    }

    //The VRF Coordinator only calls the function named fulfillRandomness. It doesn't know whether it is providing a random number for a mint or an upgrade. The contract must interpret this from the requestID by checking which mapping it is a part of.
    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override {
        require(msg.sender == vrfCoordinator, "Only the VRF Coordinator may call this function.");
        if (tokenToUpgrade[requestId] != 0) {
            upgradePig(tokenToUpgrade[requestId], randomNumber);
        } else {
            mintPig(minterAddress[requestId], randomNumber);
        }
    }

    //While the mint function starts here, it is the VRF Coordinator who actually mints the NFTs.
    function mint() external payable nonReentrant {
        require(permanentlyStop == false, "Minting has been permanently disabled.");
        require(forSale == true, "Minting has been paused.");
        require(msg.value == price, "Wrong amount for mint.");

        //If the correct amount is sent, then request a VRF number.
        getRandomNumberForMint();
        (bool mintPaymentSent, ) = payable(receiverAccount).call { value: msg.value }("");
        require(mintPaymentSent, "Failed to send Ether for minting.");
    }

    //Some frontends may look for this optional ERC721 implementation.
    function totalSupply() public view returns(uint256) {
        return totalNFTs;
    }

    //Returns all the mapping data in one call.
    function getUpgrades(uint256 tokenID) public view returns(uint256, uint256, uint256, uint256, uint256, uint256, uint256) {
        return (chipStack[tokenID], plaqueStack[tokenID], totalAces[tokenID], matchingAces[tokenID], diamondAces[tokenID], lastLeftCard[tokenID], lastRightCard[tokenID]);
    }

    //This is a lookup table to make the background rarity non-linear.
    function backgroundLookup(uint256 index) internal pure returns(uint256) {
        if (index <= 40) return 0;
        else if (index <= 50) return 1;
        else if (index <= 60) return 2;
        else if (index <= 70) return 3;
        else if (index <= 80) return 4;
        else if (index <= 85) return 5;
        else if (index <= 90) return 6;
        else if (index <= 95) return 7;
        else if (index < 99) return 8;
        return 9;
    }

    //Called from fulfillRandomness.
    function mintPig(address minter, uint256 randomNumberFromChainlink) internal { //Change to public for Remix testing. You can directly input numbers this way.
        //Increment the total of minted NFTs. This is used for tracking the chronological order, and compatibility with existing ERC721 patterns.
        totalNFTs++;
        //The backgrounds are a non-linear feature of the pig. It is a 1 in 100 chance to get the rarest Level 10 background. It returns only a single digit for purposes of sprite mapping.
        uint256 background = backgroundLookup(randomNumberFromChainlink % 10 ** 11 / 10 ** 9);
        //The token ID is made up of the chronological number that is prepended, the background number, and a straight crop of the last 9 numbers of the VRF returned random number. Each of these number represents a sprite.
        uint256 tokenID = ((totalNFTs * 10 ** 10) + (background * 10 ** 9)) + randomNumberFromChainlink % 10 ** 9;
        //Mint the pig.
        _mint(minter, tokenID);
        //Take the chronological number of each pig and use it as a key to find the full token ID. This is useful for Web3 operations.
        lookupFullTokenID[totalNFTs] = tokenID;
        //Crop out six digit pieces of the returned VRF number. This in effect makes a 1 million card shoe for each card and renders modulo bias moot.
        uint256 leftCard = (((randomNumberFromChainlink % 10 ** 22 / 10 ** 16) + 52) % 52) + 1;
        uint256 rightCard = (((randomNumberFromChainlink % 10 ** 16 / 10 ** 10) + 52) % 52) + 1;
        //This saves the cards to a mapping so the lookup function can fetch the last cards dealt for display on the pig.
        lastLeftCard[tokenID] = leftCard;
        lastRightCard[tokenID] = rightCard;
        //Initialize the chip stack with a single 1000 chip.
        chipStack[tokenID] = 1;
        //If the first hand dealt is aces, add it to the total.
        if ((leftCard == 1 || leftCard == 14 || leftCard == 27 || leftCard == 40) && (rightCard == 1 || rightCard == 14 || rightCard == 27 || rightCard == 40)) {
            totalAces[tokenID] = 1;
            //Add a plaque
            plaqueStack[tokenID] = 1;
            //Check if they are matching aces.
            if (leftCard == rightCard) {
                matchingAces[tokenID] = 1;
                //If they are matching aces, then check to see if they are matching diamond aces.
                if (leftCard == 14 && rightCard == 14) {
                    diamondAces[tokenID] = 1;
                }
            }
        }

        //It's a mint, but also deals a hand. We track this for frontend purposes.
        totalHandsDealt++;
        //It's also considered an upgrade since the hand and chip added goes to upgrade totals.
        upgradeCount[tokenID] += 1;
        //We use this mapping to easily find the history of VRF results, such as the last five hands dealt, or when aces were hit.
        lookupTokenHistory[tokenID].push(tokenHistory(chipStack[tokenID], plaqueStack[tokenID], totalAces[tokenID], matchingAces[tokenID], diamondAces[tokenID], lastLeftCard[tokenID], lastRightCard[tokenID]));
        //isMint is true because this is a mint event.
        emit HandDealt(tokenID, leftCard, rightCard, true);
    }

    //While the upgrade function starts here, it is the VRF Coordinator who actually mints the NFTs.
    function upgrade(uint256 tokenID) external payable {
        require(msg.sender == ownerOf(tokenID));
        require(msg.value == upgradePrice, "Wrong amount for upgrade.");

        //If the correct amount is sent, then request a VRF number.
        getRandomNumberForUpgrade(tokenID);
        (bool upgradePaymentSent, ) = payable(receiverAccount).call { value: msg.value }("");
        require(upgradePaymentSent, "Failed to send Ether for upgrade.");
    }

    //Called from fulfillRandomness.
    function upgradePig(uint256 tokenID, uint256 randomNumberFromChainlink) internal { //Change to public for Remix testing. You can directly input numbers this way.
        //The maximum number of chips is 200. If there are already 200 chips, then this is ignored, and only new plaques can be earned.
        if (chipStack[tokenID] < 200) {
            chipStack[tokenID] += 1;
        }
        //Crop out six digit pieces of the returned VRF number. This in effect makes a 1 million card shoe for each card and renders modulo bias moot.
        uint256 leftCard = (((randomNumberFromChainlink % 10 ** 12 / 10 ** 6) + 52) % 52) + 1;
        uint256 rightCard = (((randomNumberFromChainlink % 10 ** 6) + 52) % 52) + 1;
        //This saves the cards to a mapping so the lookup function can fetch the last cards dealt for display on the pig.
        lastLeftCard[tokenID] = leftCard;
        lastRightCard[tokenID] = rightCard;
        //Evaluate the hand to check if it is aces, and then what type of aces.
        if (plaqueStack[tokenID] < 3) {
            if ((leftCard == 1 || leftCard == 14 || leftCard == 27 || leftCard == 40) && (rightCard == 1 || rightCard == 14 || rightCard == 27 || rightCard == 40)) {
                totalAces[tokenID] += 1;
                //Add a plaque
                plaqueStack[tokenID] += 1;
                //Check if they are matching aces.
                if (leftCard == rightCard) {
                    matchingAces[tokenID] += 1;
                    //If they are matching aces, then check to see if they are matching diamond aces.
                    if (leftCard == 14 && rightCard == 14) {
                        diamondAces[tokenID] += 1;
                    }
                }
            }
        } else if (plaqueStack[tokenID] < 7) {
            if ((leftCard == 1 || leftCard == 14 || leftCard == 27 || leftCard == 40) && (rightCard == 1 || rightCard == 14 || rightCard == 27 || rightCard == 40)) {
                totalAces[tokenID] += 1;
                //Check if they are matching aces.
                if (leftCard == rightCard) {
                    //Add a plaque
                    plaqueStack[tokenID] += 1;
                    matchingAces[tokenID] += 1;
                    //If they are matching aces, then check to see if they are matching diamond aces.
                    if (leftCard == 14 && rightCard == 14) {
                        diamondAces[tokenID] += 1;
                    }
                }
            }
        } else {
            if ((leftCard == 1 || leftCard == 14 || leftCard == 27 || leftCard == 40) && (rightCard == 1 || rightCard == 14 || rightCard == 27 || rightCard == 40)) {
                totalAces[tokenID] += 1;
                //Add a plaque
                if (leftCard == rightCard) {
                    matchingAces[tokenID] += 1;
                    //If they are matching aces, then check to see if they are matching diamond aces.
                    if (leftCard == 14 && rightCard == 14) {
                        if (plaqueStack[tokenID] < 10) {
                            //Add a plaque
                            plaqueStack[tokenID] += 1;
                        }
                        diamondAces[tokenID] += 1;
                    }
                }
            }
        }

        //Add to the total hands dealt total.
        totalHandsDealt++;
        //Add to the total upgrades of the pig. This can exceed the cap on chips, so we need to save for statistical purposes.
        upgradeCount[tokenID] += 1;
        //We use this mapping to easily find the history of VRF results, such as the last five hands dealt, or when aces were hit.
        lookupTokenHistory[tokenID].push(tokenHistory(chipStack[tokenID], plaqueStack[tokenID], totalAces[tokenID], matchingAces[tokenID], diamondAces[tokenID], lastLeftCard[tokenID], lastRightCard[tokenID]));
        //isMint is false because this is an upgrade event.
        emit HandDealt(tokenID, leftCard, rightCard, false);
    }

    //Start or pause the minting functionality in the contract.
    function changeSaleState() external onlyOwner {
        forSale = !forSale;
    }

    //Permanently stops minting. This cannot be reverted. Only can be triggered when forSale is false.
    function permanentlyStopMinting() external onlyOwner {
        require(forSale == false, "You must switch off mints before permanently disabling them manually.");
        require(permanentlyStop == false, "Minting has already been permanently disabled.");
        permanentlyStop = true;
    }

    //Start or pause the upgrade functionality in the contract.
    function changeUpgradeState() external onlyOwner {
        upgradeable = !upgradeable;
    }

    //Permanently stops upgrades. This cannot be reverted. Only can be triggered when permanentlyStopUpgrades is false.
    function permanentlyStopUpgrading() external onlyOwner {
        require(upgradeable == false, "You must switch off upgrades before permanently disabling them manually.");
        require(permanentlyStopUpgrades == false, "Upgrading has already been permanently disabled.");
        permanentlyStopUpgrades = true;
    }

    //Change the price of upgrading.
    function changeUpgradePrice(uint256 newUpgradePrice) external onlyOwner {
        upgradePrice = newUpgradePrice;
    }

    //Change the price of minting.
    function changePrice(uint256 newPrice) external onlyOwner {
        price = newPrice;
    }

    //Set the receiving account.
    function changeReceivingAccount(address payable newReceivingAddress) external onlyOwner {
        receiverAccount = newReceivingAddress;
    }

    //Change the owner of the contract.
    function changeContractOwner(address payable newcontractOwner) external onlyOwner {
        contractOwner = newcontractOwner;
    }

    //Get the total stack of a particular pig.
    function totalStack(uint256 tokenID) external view returns(uint256) {
        uint256 totalChipStack = chipLookup(chipStack[tokenID]) + plaqueLookup(plaqueStack[tokenID]);
        return totalChipStack;
    }

    //Calculates the total chip stack exclusive of plaques.
    function chipLookup(uint256 chips) internal pure returns(uint256) {
        if (chips <= 100) {
            return 1000 * chips;
        }
        return (5000 * (chips - 100)) + 100000;
    }

    //Calculates the total plaque stack exclusive of chips.
    function plaqueLookup(uint256 plaques) internal pure returns(uint256) {
        if (plaques > 0) return 25000 * plaques;
        else return 0;
    }

    //This function allows the metadata to be updated, and the location of it to be changed to decentralized file services after minting.
    function _setTokenUri(string memory newuri) public onlyOwner {
        baseURI = newuri;
    }

    //Withdraw all of the LINK from the contract. Probably not necessary since we know the total amount of pigs that can be minted, but you never know.
    function withdrawLink() external onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(linkTokenAddress);
        require(link.transfer(receiverAccount, link.balanceOf(address(this))), "Unable to transfer");
    }
}