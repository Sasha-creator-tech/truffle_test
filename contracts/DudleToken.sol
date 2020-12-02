// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract DudleToken {
  	string public constant name = "DudleToken";
    string public constant symbol = "DLT";
    uint8 public constant decimals = 1;
    
    uint public totalSupply;
    
    mapping (address => uint) balances;
    
    mapping(address => mapping(address => uint)) allowed;
    
    event Transfer(address indexed _from, address indexed _to, uint _value);
    event Approval(address indexed _from, address indexed _to, uint _value);

    constructor () public {
    	//the owner need to have 1000 tokens after deploy
    	balances[msg.sender] = 1000;
    	totalSupply += 1000;
    }
    
    function allowance(address _owner, address _spender) public view returns (uint) {
        return allowed[_owner][_spender];
    }
    
    function balanceOf(address owner) public view returns (uint) {
        return balances[owner];
    }
    
    function transfer(address _to, uint _value) public {
        require(balances[msg.sender] >= _value && balances[_to] + _value >= balances[_to]);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
    }
    
    function transferFrom (address _from, address _to, uint _value) public {
        require(balances[_from] >= _value && balances[_to] + _value >= balances[_to] && allowed[_from][msg.sender] >= _value);
        balances[_from] -= _value;
        balances[_to] += _value;
        allowed[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
    }
    
    function approve (address _spender, uint _value) public {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
    }
}