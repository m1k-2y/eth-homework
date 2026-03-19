// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ChainSound {
    struct Track {
        uint256 id;
        string title;
        string artist;
        string previewURL;
        string URL;
        uint256 price;
        address payable creator;
        bool exists;
    }

    uint256 public nextTrackId;
    uint256 public platformFeePercent = 5;
    address payable public owner;

    mapping(uint256 => Track) public tracks;
    mapping(address => mapping(uint256 => bool)) public hasPurchased;

    event TrackAdded(
        uint256 indexed trackId,
        string title,
        string artist,
        uint256 price,
        address indexed creator
    );

    event TrackBuy(
        uint256 indexed trackId,
        address indexed buyer,
        uint256 price
    );

    constructor() {
        owner = payable(msg.sender);
    }

    function AddTrack(
        string memory _title,
        string memory _artist,
        string memory _previewURL,
        string memory _URL,
        uint256 _price
    ) external {
        require(_price > 0, "Price must be greater than 0");

        tracks[nextTrackId] = Track({
            id: nextTrackId,
            title: _title,
            artist: _artist,
            previewURL: _previewURL,
            URL: _URL,
            price: _price,
            creator: payable(msg.sender),
            exists: true
        });

        emit TrackAdded(
            nextTrackId,
            _title,
            _artist,
            _price,
            msg.sender
        );

        nextTrackId++;
    }

    function BuyTrack(uint256 _trackId) external payable {
        Track storage track = tracks[_trackId];

        require(track.exists, "Track does not exist");
        require(msg.value == track.price, "Incorrect price");
        require(!hasPurchased[msg.sender][_trackId], "Already purchased");

        uint256 fee = (msg.value * platformFeePercent) / 100;
        uint256 creatorAmount = msg.value - fee;

        hasPurchased[msg.sender][_trackId] = true;

        (bool successCreator, ) = track.creator.call{value: creatorAmount}("");
        require(successCreator, "Transfer to creator failed");

        (bool successOwner, ) = owner.call{value: fee}("");
        require(successOwner, "Transfer to platform failed");

        emit TrackBuy(_trackId, msg.sender, msg.value);
    }

    function getTrack(uint256 _trackId) external view returns (Track memory) {
        require(tracks[_trackId].exists, "Track does not exist");
        return tracks[_trackId];
    }

    function canAccess(address user, uint256 trackId) external view returns (bool) {
        return hasPurchased[user][trackId];
    }

    function setPlatformFeePercent(uint256 _newFeePercent) external {
        require(msg.sender == owner, "Only owner");
        require(_newFeePercent <= 20, "Fee too high");
        platformFeePercent = _newFeePercent;
    }
}