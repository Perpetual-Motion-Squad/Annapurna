// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Annapurna is ERC1155, Ownable {
    uint256 public constant MINT_PRICE = 0.05 ether;

    mapping(uint256 => string) tokenURIs;
    mapping(uint256 => uint256) tokenSupply;

    constructor() ERC1155("") {
        tokenSupply[0] = 1;
        tokenURIs[0] = "asdf";
    }

    function getTokenSupply(uint256 tokenId) public view returns (uint256) {
        return tokenSupply[tokenId];
    }

    function setTokenSupply(
        uint256 _tokenId,
        uint256 _supply,
        string memory _tokenURI
    ) external onlyOwner {
        require(_supply > 0, "Annapurna: Supply must be greater than 0");
        require(
            tokenSupply[_tokenId] == 0,
            "Annapurna: Token supply already set"
        );
        tokenSupply[_tokenId] = _supply;
        tokenURIs[_tokenId] = _tokenURI;
    }

    function mint(
        address recipient,
        uint256 _tokenId,
        uint256 _amount
    ) external payable {
        require(
            msg.value == MINT_PRICE * _amount,
            "Annapurna: Incorrect amount of ETH sent"
        );
        require(
            tokenSupply[_tokenId] >= _amount,
            "Annapurna: Not enough tokens left to mint"
        );
        tokenSupply[_tokenId] -= _amount;
        _mint(recipient, _tokenId, _amount, "");
    }

    function uri(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        return tokenURIs[_tokenId];
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }
}
