pragma solidity ^0.8.0;

contract First {

    address owner;
    constructor() {
        owner = msg.sender;
    }

    function transfer(address payable receiver) payable public 
    returns(uint, uint, uint, uint) 
    {
        uint senderBalanceBeforeTx = address(msg.sender).balance;
        uint receiverBalanceBeforeTx = address(receiver).balance;

        receiver.transfer(msg.value);

        uint senderBalanceAfterTx = address(msg.sender).balance;
        uint receiverBalanceAfterTx = address(receiver).balance;

        return (address(msg.sender).balance, address(receiver).balance,
        address(msg.sender).balance, address(receiver).balance);
    }

}