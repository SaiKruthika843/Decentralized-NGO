// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract NGODonation{

    mapping(address=>uint) public donors;
    address public NGO;
    uint public donationReceived;
    uint public noOfDonors;

    struct Request{
        string purpose;
        address payable donee;
        uint value;
        bool completed;
        uint noOfValidators;
        mapping(address=>bool) validators;
    }

    //Mapping the no.of requests for a particular purpose 
    mapping(uint=>Request) public requests;
    uint public numOfRequests;
    constructor(){
        NGO = msg.sender;
    }
    
    function sendEth() public payable{
     require(msg.value>0,"Minimum Donation is not met");
     if(donors[msg.sender]==0)  {
         noOfDonors++;
     } 
     donors[msg.sender]+=msg.value;
     donationReceived+=msg.value;
    }


    function getContractBalance() public view returns(uint){
        return address(this).balance;
    }

    modifier onlyNGO(){
        require(msg.sender==NGO,"Only NGO can call this function");
        _;
    }

    function sendRequests(string memory _purpose,address payable _donee,uint _value) public onlyNGO{
        Request storage newRequest = requests[numOfRequests];
        numOfRequests++;
        newRequest.purpose = _purpose;
        newRequest.donee = _donee;
        newRequest.value = _value;
        newRequest.completed = false;
        newRequest.noOfValidators = 0;

    }

    
    function approveRequest(uint _requestNo) public onlyNGO{
        Request storage thisRequest=requests[_requestNo];
        require(thisRequest.completed==false,"The Request has been completed");
        require(thisRequest.noOfValidators > noOfDonors/2,"Majority does not support the the Request");
        thisRequest.donee.transfer(thisRequest.value);
        thisRequest.completed=true;
    }
     function validateRequest(uint _requestNo) public{
        require(donors[msg.sender]>0,"You must be a donor for validating the request");
        Request storage thisRequest=requests[_requestNo];
        require(thisRequest.validators[msg.sender]==false,"You have already voted");
        thisRequest.validators[msg.sender]=true;
        thisRequest.noOfValidators++;
    }

    function getRequests() public view returns (string[] memory ,address payable[] memory,uint[] memory){
        string[] memory purpose = new string[](numOfRequests);
        address payable[] memory donee = new address payable[](numOfRequests);
        uint[] memory value = new uint[](numOfRequests);
        for(uint i = 0; i < numOfRequests; i++){
            Request storage request = requests[i];
            purpose[i] = request.purpose;
            donee[i] = request.donee;
            value[i] = request.value;
            
        }
        return(purpose,donee,value);
    }

}