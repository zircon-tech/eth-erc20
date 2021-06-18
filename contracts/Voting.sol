// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Lets people store a value
contract Voting {
    string[] public candidates = ["fede", "gomix"];
    mapping(string => uint8) votes;

    function voteFor(string memory _candidate) public {
        votes[_candidate] += 1;
    }

    function votesReceived(string memory _candidate) public view returns (uint8) {
        return votes[_candidate];
    }

}
