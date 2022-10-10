const { contractAbi } = require('./abi'); 
const Web3 = require('web3');

// console.log(contractAbi)
const TEST_NET_INFURA_URL = 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'

// let web3 = new Web3('https://speedy-nodes-nyc.moralis.io/2be1730aae9746216b41f137/eth/rinkeby');
let web3 = new Web3(TEST_NET_INFURA_URL);
const contractAddr = '0xcD6a42782d230D7c13A74ddec5dD140e55499Df9'

const myContract = new web3.eth.Contract(contractAbi, contractAddr);
console.log('running')
myContract.getPastEvents('transferEvent')
    .then(res => console.log('Res', res))
    .catch(err => console.log('error', err))

const eventListener = () => {

  const contractAddr = '0xBCB54052E11Ab15fd426842CfD42020c1af2ee4e';
  const myContract = new web3.eth.Contract(eventListenerContractAbi, contractAddr);
  console.log('My contract', myContract);
  myContract.getPastEvents('transferEvent')
    .then(res => console.log(res))
    .catch(err => console.log(err));

  myContract.events.allEvents(res => console.log(res));

  myContract.events.transferEvent({
    // filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0
}, function(error, event){ console.log(event); })
.on('data', function(event){
    console.log(event); // same results as the optional callback above
})
.on('changed', function(event){
    console.log('hello')
    // remove event from local database
})
.on('error', console.error);
    console.log('err')

}
