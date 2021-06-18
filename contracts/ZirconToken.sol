// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ZirconToken {
    string public name = "ZirconToken";
    string public symbol = "ZCN";
    uint8 public decimals = 18;

    uint256 public totalSupply = 1000 * 10 ** decimals;

    mapping(address => uint256) public balanceOf;

    event Transfer(address _from, address _to, uint256 _amount);

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

     // function mint(address _to, uint256 _amount)

     // function approve(address _spender, uint256 _amount)

}
