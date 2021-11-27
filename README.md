![DegenerateFarm Logo](https://www.degeneratefarm.io/degenerate-farm-logo.png)
## Background

Degenerate Farm is based on the artistic career and vision of Russian artist Nadia Khuzina with allusions to the book Animal Farm. A survivor of the Soviet Union, political censorship, and corporate copyright infringement, Nadia began her journey in crypto from the standpoint of rights management, seeking to preserve her rights as an artist. Her artwork covering North Korea, and Kim Jong Un, was ranked ahead of Bitcoin in South Korea's Gentleman Magazine in 2013, and her derivative app Slot Dictator was covered in the main Chinese newspapers.

Nadia was a co-founder, and the sole artist of EtherCats.io, the first NFT project to use Chainlink VRF. This project was a bid to bring people together away from the divisive politics inflamed by the global pandemic, but with Degenerate Farm, it serves as a progression to unite under the original ideological principles of crypto.

While EtherCats brought some of the most spectacularly animated NFTs to the market in a provably random way, and brought along with it other NFT innovations, it lacked the ability to be upgraded. EtherCats also did not allow for random generative properties of the cats. They came with only a rating and multiplier with the intent to be used in a card game (currently being play tested). It was a proof of concept of sorts for Chainlink VRF, and the rapidly growing need for a unique digital identities became much more clear shortly thereafter.

![DegenerateFarm's First Characters - The Pig](https://www.degeneratefarm.io/degenerate-pigs.png)

## Problem

While the ERC721 and ERC1155 are permissive standards that allow for mutable metadata, it has not yet been agreed upon how upgrades in real time to NFTs should best be carried out. Current upgradeable patterns revolve around redemptions for different tokens, proxy contracts, and simply minting new tokens. All of these strategies impact the provenance of the NFT, and make it difficult to understand for the end user what is what.

## Solution

Degenerate Farm turns that on its heads with the novel process of how it tracks upgrades. It also iterates on the pattern of using the token ID to be the properties of the NFT itself.

Instead of rending the NFT as an image, it takes advantage of the animation_url metadata property to render the NFT as an HTML5 app with a conglomerated group of sprites that are chosen from the JavaScript file by reading the filename (which is the token ID). The idea of making the NFT as a web app was first used by Ether Cards (which this project will be merging with after the hackathon), but with Degenerate Farm we take it further by embedding AlchemyWeb3.js into the NFT. These calls go directly to the mapping of each unique ERC721 token ID's upgrades and are rendered in real time on the NFT. Alchemy's reliability is important because without it, the NFTs will fail to display the upgrades.

## Mint Process

The hackathon release will feature the first animal of the project, pigs. In future releases (on Ether Cards), different animals and characters will be available for minting. The pigs are limited to 512 total NFTs. To reward DegenerateFarm.io, EtherCats.io, and Ether Cards fans, we will mint the first 16 pigs to be given away in different pre-published ways. This is necessary because in order to activate our OpenSea collection beforehand, we need to mint ourselves first. It would not be fair to hold back these low numbered pigs for ourselves later. It is easiest to to give them away.

When a user mints a pig, it sends a request to Chainlink VRF to call the contract back with a random number. Only the VRF coordinator can actually call the function that triggers the mint function. This means there is a delay between when a user's mint transaction is confirmed, and the NFT is actually minted. There also is an additional delay if you want to see it on OpenSea, because OpenSea must then ingest the NFT into their system by parsing the metadata. This is very processor intensive so in peak periods it can take up to an hour, although usually it takes about 1 minute.

The mint function that takes the returned random number and uses that to build the pig. Each token ID has 10 property numbers, and the token ID itself prepended to that. This means that each pig will have a chronological order of mint in the name of the NFT, and will also come with all the properties that make up the pig.

![Token ID Format](https://www.degeneratefarm.io/token-id-format.png)

Most of the generative parts of the pig are linear. We have 10 sprites for each each relevant body part. This is to keep things simple with the contract, and avoid modulo bias in the least amount of gas. Chainlink VRF currently has a 200,000 gas limit. That means you have some constraint in the operations you can do in calculating the properties of an NFT. In this case, we have a lookup table for only the background, which has offers a 1 in 100 chance of getting a Level 10 background, along with an increasing difficulty up to that point for the other level. The subsequent properties are all a linear 1 in 10 to get.

![Non-Linear Background Rarity](https://www.degeneratefarm.io/background-rarity.png)

Once the pig is minted by the VRF coordinator calling back, NFT indexers like OpenSea will see the mint event and begin to parse the metadata. In EtherCats, we enumerated all possible token IDs and pre-published them on IPFS. Degenerate Farm, however, has zillions of possible permutations in the token ID, or more specifically 512 * 10^10. We were already at the limits of IPFS with 4,500 EtherCats metadata files. The only solution is a an API, which unfortunately has to be centralized at this point in time, at least for the duration of minting.

Our API is quite simple and uses AWS Lambda. The biggest problem with a centralized API thankfully isn't censorship just yet, but a DDoS attack. AWS has advanced tools for rate limiting, and distributing things to make it harder to pull off. When called, the API replies with the JSON metadata of the token ID requested. Instead of generating all possible combinations of token IDs, we only after to build the one requested, and only when requested.

There's one small, but clever step before anyone fetches the metadata for the pig, and that's the HTML file generation. We also use Alchemy on our nodejs backend to listen for mint events. When a pig is minted our server automatically generates an HTML file that is linked to in the metadata. The clever part is that every HTML file for each and every pig is exactly the same. The only difference is the name of the HTML file. The base script can build any pig. It does this by reading the file name from the HTML file, which you guessed it, is the token ID. This means that once you build one pig, you've built them all. The token ID is just the input.

Once minting is finished, both the base metadata URI, and HTML files can be pointed to IPFS. Once everything is done that needs to be done in the project, then the ability to change the pointer can be permanently disabled in the contract.

## Upgrade Process

Upgrading is the hook of this hackathon entry besides the wonderful art. Generative pigs are fun, but leveling up your pig, and trying to get the highest score is what will keep people interested. Having rarity be a dynamic thing encourages people to participate, and reach limited time rewards milestones not present in other generative projects.

After a pig is minted it starts with 1,000 chips, depicted in the NFT as a single yellow 1,000 chip, and a random card hand. These cards come from a random 1,000,000 card shoe, meaning it is possible to have duplicate cards of the same suit. If the hand happens to be two aces, then a 25,000 plaque is awarded, and they also start with that.

When an owner upgrades their pig, they ask Chainlink VRF for another number. After the VRF coordinator calls back, the contract maps the request so that when the VRF coordinator calls back that it triggers an upgrade. When the upgrade function is called, they get an extra chip added to their stack (1,000 for the first 100 chips, and 5,000 after that up to a maximum of 600,000 total chips). Then they get an entirely new card hand each time they upgrade. If on any hand they get aces, the pig gets a 25,000 plaque added. 

It's not so simple to max out the stack of plaques though. Once you get three plaques, you will need your aces to have matching suits in order to level up the plaque. (Aces without matching suits are still added to the total aces count.) If you are lucky enough to acquire seven plaques, it then gets very difficult to continue your journey to the maximum 10 plaques. You will need to get matching diamond aces to top up your stack of plaques further.

While the total chip stack is intended as the main rarity metric, the stats of total aces, matching aces, and diamond aces are tracked for the purpose of rarity tie-breaking. If there are two pigs with the maximum number of chip/plaques, then the pig with the most diamond aces will be the rarest. If the total of aces is still tied, then the pig with more matching aces is considered rarest, and if that is tied it is resolved by the total aces count. If the tie still cannot be broken, then the pig with the lower mint number will edge out the other. 

The rarity ranking is just for fun, but might be used as the basis for giveaways, airdrops, and access to certain products in the future.

(Note: Below is a technical step-by-step explanation of how this process functions in tutorialized form, including how we use Alchemy for Web3 calls from inside the NFT.)

## Purpose 

The main purpose of this hackathon entry is to show an alternate way of engineering NFT upgrades in a verifiably random fashion. Like the EtherCats Founders Series, it is a demonstration of what's possible more than a perfection of the technology. We hope this project will influence the thought of not only creators, but infrastructure providers like Alchemy in developing solutions to issues faced by NFT projects in the future.

## New to Chainlink VRF

The official docs of Chainlink VRF do not tell people that they can use VRF for different function calls. We believe our code should be added as an example of how to differentiate callbacks to fulfillRandomness, which is the only function the VRF Coordinator can call.

```    
//The VRF Coordinator only calls the function named fulfillRandomness. It doesn't know whether it is providing a random number for a mint or an upgrade. The contract must interpret this from the requestID by checking which mapping it is a part of.
    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override {
        require(msg.sender == vrfCoordinator, "Only the VRF Coordinator may call this function.");
        if (tokenToUpgrade[requestId] != 0) {
            upgradePig(tokenToUpgrade[requestId], randomNumber);
        } else {
            mintPig(minterAddress[requestId], randomNumber);
        }
    }
 ```

 ## Bugs Found

 1) The animation_url isn't respected as the preview image on indexers like OpenSea. This means OpenSea shows a blank image on mint. We have finished a local version that listens for events and build a preview image of the minted pig, but need more time to implement on the backend. The need for this is moot once minting is complete, so it is not a top-priority as nobody is going to sell on OpenSea before minting finishes.

 2) Alchemy and OpenSea did not imagine such a pattern, so we are working with them to fix both API whitelisting and UX. We hope our project is successful so they can progress forward with the gamified future of NFTs.

 3) Web3 is a bit of a joke for login management. While we have used socketio and nonce message signing to authenticate users, DegenerateFarm only needs to know the root account logged in and the network. Unfortunately, our code that worked in the past we realized had some issues. Web3 also doesn't allow for a dapp to log people out. That can only be a user choice. This makes managing state challenging. There are third party services that simplify this, but at the expenses of centralization, so we spent some time refactoring.

 4) WebKit. Yea. WebKit is awful and full of bugs. It is extraordinary that the person who envisioned mobile phones being able to run web applications didn't foresee the need for following the rules of standards. It is for this reason we chose to use absolute positioned sprites of all the same dimensions. We intend to use mapped spritesheets as we have done in other projects when it is serviceable in a decentralized way. For now we have chosen a slightly more bloated sprite rendering system to maximize browser compatibility.

 ## Road Ahead

 The pattern of upgradeable NFTs has unlocked a host of multi-billion dollar project ideas (in tomorrow dollar maybe trillions) for us in gamifying DeFi and educational investing. While crypto loves vice, those involved in EtherCats seek to make the future of our children to be in a happier world. Although we see solutions outside of any collective, that doesn't mean we don't recognize the value sharing our ideas to the world in an open source manner. There is nothing in DegenerateFarm the average technical person couldn't do, but it is unlikely for any average person to accomplish anything by simply consuming ideas. It is getting your hands dirty that allows one to find solutions to problems. This is the way of John Galt, and that's exactly what was reinforced to us coming together in this hackathon. We became better at our jobs and learned new skills, and we found many new ways to take NFTs to the next level.

 ## Step-by-Step Process and Technical Discussion

**Minting Process**

**Step 1**

Click 'Mint' and pay 25 Matic to the mint function of the smart contract.

**Step 2**

The smart contract makes a request to Chainlink VRF for a random number attached to a unique request ID. This request ID is important because it allows the contract to keep track of things over the course of two asynchronous transactions from two different addresses. One address is your address, the other is the VRF Coordinator's.

**Step 3**

The Chainlink VRF Coordinator returns a random number to the smart contract which then is used to mint a pig (with a unique token ID) and transfer it to the transaction matching your request ID.

**Step 4**

When a pig is minted, a transfer event is fired. Our nodejs backend is subscribed with Alchemy Web3.js to listen for these events. When one occurs, the backend creates an HTML file that has the token ID as the filename. Every HTML file is exactly the same no matter which pig. The HTML file that is created is literally the NFT. NFTs are just token IDs that have pointers to metadata, and this is no different.

**Step 5**

Now things get spicy. In the EtherCats Founders Series, there were 9 cats (1 image each), with 500 combinations for each cat coming from a 1 to 100 rating, and a 1x, 2x, 3x, 5x, or 8x. While it was a 1 in 1 million chance to pull a 100 rated cat with an 8x multiplier, there remained only 4,500 possible JSON metadata files that could be minted. This allowed for the metadata to be enumerated before the contract was even deployed, and allowed for instant gratification see your mint appear after on OpenSea. However, even with this small number of 4,500, we were near the limit of files in an IPFS directory.

To expand things to have billions of possible images, like we have in DegenerateFarm, meant that even if we could enumerate all of the lightweight metadata files, there aren't enough computers on Earth to render or store all of the possible image permutations. The solution to the metadata component is nearly the same as enumerating all possibilities, but instead of outputting all possibilities, we use a metadata API that only spits out the relevant metadata when asked. DegenerateFarm is using the very reliable AWS Lambda for serving metadata until minting is completed. After we know the token IDs of all 1024 pigs, then it is trivial to enumerate the output, and we can move this precious metadata permanently to IPFS.

The solution to the image rendering problem is sprites, and making use of the animation_url standard in NFT metadata. While to the end user the pig appears as a simple image, it is actually absolute positioned sprites of each trait layered on top of each other, and rendered as a full web application. Yes, the animation_url property allows us to load scripts. This means that the immutable token ID that Chainlink VRF helped output is actually the map to every property of your NFT!

When the backend server output a seemingly redundant HTML file, what it was really doing is giving a unique file that the metadata API script could calculate and point to. The HTML file loads a unified script that parses the filename from the HTML file and uses it to load the correct sprites from further parsing the makeup of the token ID itself.

**Upgrade Process**

**Step 1**

 Enter the Pig # of the pig you want to upgrade and then click the blue 'View Pig' button below. Once your pig is displayed, click the red upgrade button below and pay 2 Matic to the upgrade function of the smart contract.

**Step 2** 

The smart contract makes a request to Chainlink VRF for a random number attached to a unique request ID. This request ID is saved to a different mapping so contract can differentiate between mints and upgrades..

**Step 3** 

The Chainlink VRF Coordinator returns a random number to the smart contract which is then used to update the pig with your upgrade. Each upgrade adds a chip to the stack of the pig. The first 100 upgrades add one visible yellow chip, which are worth 1,000 leaderboard points each respectively. The next 100 upgrades also add one visible white chip, which are worth 5,000 leaderboard points each respectively. You get these chips no matter what hand you get dealt. This keeps happening until chips are capped at 200 total displayed (600,000 leaderboard points). If on any hand, including during minting, you hit any combination of two aces, then you get a coveted plaque worth 25,000 leaderboard points. After three plaques you must hit matching suits on your aces to earn additional plaque, and after seven, you need matching diamond aces until you hit the display cap of 10 plaques. This is hard to achieve, but if there are multiple maxed out ranking point totals, then the tie breakers of total aces, matching aces, and diamond aces are tracked indefinitely. If it is somehow still tied, then the lower mint number is ranked higher. The odds of hitting aces are better than in poker at 1 in 169. This is because each card is dealt from a separate duplicate deck generated from the Chainlink VRF number.

**Step 4**

It's great that you can level up your pig, but how is it going to be displayed on OpenSea?

This is why DegenerateFarm is so amazing. The same strategy that allows for generative VRF minting allows us to load a second script! In this case it is AlchemyWeb3.js. Alchemy allows us to make gas free view calls to the state of the blockchain via Web3. This means the same script that generates the pig from sprites can also return sprites based on the current state of your pig. Besides the 30 second lag for Chainlink VRF to call back with a verifiably random number, it takes place in real time. 

DegenerateFarm uses Alchemy for Web3 calls because it is absolutely crucial that the dynamic properties of the upgrades are shown all of the time. Alchemy is superior to Infura and running your own node in a number of way, and we are working with them to help develop better whitelisting functionality for API keys for projects using our pattern.

## Characters and Personality

We believe that while many people want to base their digital PFP identity on a single 1/1 NFT, there are moods and personalities applicable to life in the metaverse that many will also want to share. It's intended that most humans will only identify sarcastically with these pigs, but they all convey an emotion linked to their underlying personalities that is useful to social expression in various contexts. This means that while each DegenerateFarm pig is a 1/1 PFP with unique traits, they are not so drastically different as to be exclusive to one cause or person.

## **Pig Jong Un**

![Pig Jong Un](https://www.degeneratefarm.io/assets/img/pig-jong-un.png)

Grand Marshal Pig Jong Un loves to gamble all night. He's a trash talker who always brings his harem with him to rail when he plays.

## **Donald Oinkler**
![Donald Oinkler](https://www.degeneratefarm.io/assets/img/donald-oinkler.png)

Donnie O keeps a tidy pen, but one of the cats spread the rumor that he paid one of the female horses to make it rain on his pile.

## **Che Chicharrón**
![Che Chicharrón](https://www.degeneratefarm.io/assets/img/che-chicharron.png)

Che's a pretty boy who grooms younger pigs into his way of thinking. He plays tight, but aggressive, and aggressive, but tight.

## **Jamón Castro**
![Jamón Castro](https://www.degeneratefarm.io/assets/img/jamon-castro.png)

Jamón reacts to threats with annoying, idiosyncratic play. Trying to time his moves is as ill advised as invading the Bay of Pigs.

## **Augusto Cochinillo**
![Augusto Cochinillo](https://www.degeneratefarm.io/assets/img/augusto-cochinillo.png)

You can't run or hide from el presidente. Augusto Cochinillo is nicknamed by the dogs "The Torturer" because he goes into the tank on every decision.

## **Hugo Oincéz**
![Hugo Oincéz](https://www.degeneratefarm.io/assets/img/hugo-oincez.png)

Hugo talks a big game, but is actually in debt to the other pigs for quite a large sum. Every time he has a score, the line at the trough is all the way out to the fence.

## **Leonid Bacon**

![Leonid Bacon](https://www.degeneratefarm.io/assets/img/leonid-bacon.png)

Leonid ignores the advice of his backers and puts his money in impulsively. He often falls asleep at the table, and starts unwinnable fights when he is drunk.

## **Joseph Snortin**

![Joseph Snortin](https://www.degeneratefarm.io/assets/img/joseph-snortin.png)

Uncle Joe is what most degenerates would refer to as a whale, but be careful, he often claims to have drank more than he actually did to lure you in.

## **Queen Swill II**
![Queen Swill II](https://www.degeneratefarm.io/assets/img/queen-swill-ii.png)

Despite her status as a fashionista, Queen Swill has always thought of herself as one of the guys. She loves telling a good porky, and mixing it up with piglets a fourth of her age.

## **Napoleon Saveloy**
![Napoleon Saveloy](https://www.degeneratefarm.io/assets/img/napoleon-saveloy.png)

Napoleon is pesky and persistent. The other pigs could learn a thing or two from him. In his mind all animals are equal, but some animals are more equal than others.