// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract NGODonation{

    mapping(address=>uint) public donors;
    address payable public NGO;
    uint public donationReceived;
    uint public noOfDonors;
    

    struct Request{
        string purpose;
        
        uint value;
        bool completed;
        uint noOfValidators;
        mapping(address=>bool) validators;
    }
    struct req{
        string purpose;        
        uint value;
        bool completed;
    }

    //Mapping the no.of requests for a particular purpose 
    mapping(uint=>Request) public requests;
    mapping(uint=>req) public reqs;

    uint public numOfRequests;
    constructor(){
        NGO = payable(address(msg.sender));
        numOfRequests=0;
    }
    
    function sendEth(uint _reqNum) public payable{
     require(msg.value>0,"Minimum Donation is not met");
     if(donors[msg.sender]==0)  {
         noOfDonors++;
     } 
     donors[msg.sender]+=msg.value;
     donationReceived+=msg.value;
     if(requests[_reqNum].value<=donationReceived &&requests[_reqNum].completed==false){
        NGO.transfer(requests[_reqNum].value);
        donationReceived-=requests[_reqNum].value;
        requests[_reqNum].completed=true;
        

     }
    }


    function getContractBalance() public view returns(uint){
        return address(this).balance;
    }

    modifier onlyNGO(){
        require(msg.sender==NGO,"Only NGO can call this function");
        _;
    }

    
    function newRequest(string memory _purpose,uint _value) public onlyNGO{
        req storage newRequest = reqs[numOfRequests];
        newRequest.purpose = "Tree plantation";       
        newRequest.value = 1000;
        newRequest.completed = false;
         numOfRequests++;

    }

    
    function approveRequest(uint _requestNo) public onlyNGO{
        Request storage thisRequest=requests[_requestNo];
        require(thisRequest.completed==false,"The Request has been completed");
        require(thisRequest.noOfValidators > noOfDonors/2,"Majority does not support the the Request");
        NGO.transfer(thisRequest.value);
        thisRequest.completed=true;
    }
     function validateRequest(uint _requestNo) public{
        require(donors[msg.sender]>0,"You must be a donor for validating the request");
        Request storage thisRequest=requests[_requestNo];
        require(thisRequest.validators[msg.sender]==false,"You have already voted");
        thisRequest.validators[msg.sender]=true;
        thisRequest.noOfValidators++;
    }

}