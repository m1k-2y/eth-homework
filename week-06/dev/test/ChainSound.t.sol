// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/ChainSound.sol";

contract ChainSoundTest is Test {
    ChainSound public chainSound;

    address public owner;
    address public artist = address(0x1);
    address public buyer = address(0x2);
    address public other = address(0x3);

    uint256 public constant PRICE = 1 ether;

    receive() external payable {}

    function setUp() public {
        chainSound = new ChainSound();
        owner = chainSound.owner();

        vm.deal(artist, 10 ether);
        vm.deal(buyer, 10 ether);
        vm.deal(other, 10 ether);
    }

    function testAddTrackStoresCorrectData() public {
        vm.prank(artist);
        chainSound.AddTrack(
            "trap1",
            "WH",
            "preview-url",
            "full-url",
            PRICE
        );

        ChainSound.Track memory track = chainSound.getTrack(0);

        assertEq(track.id, 0);
        assertEq(track.title, "trap1");
        assertEq(track.artist, "WH");
        assertEq(track.previewURL, "preview-url");
        assertEq(track.URL, "full-url");
        assertEq(track.price, PRICE);
        assertEq(track.creator, artist);
        assertTrue(track.exists);

        assertEq(chainSound.nextTrackId(), 1);
    }

    function testAddTrackRevertsWhenPriceIsZero() public {
        vm.prank(artist);
        vm.expectRevert(bytes("Price must be greater than 0"));
        chainSound.AddTrack(
            "trap1",
            "WH",
            "preview-url",
            "full-url",
            0
        );
    }

    function testBuyTrackMarksBuyerAsPurchased() public {
        vm.prank(artist);
        chainSound.AddTrack(
            "trap1",
            "WH",
            "preview-url",
            "full-url",
            PRICE
        );

        vm.prank(buyer);
        chainSound.BuyTrack{value: PRICE}(0);

        assertTrue(chainSound.canAccess(buyer, 0));
    }

    function testBuyTrackTransfersFundsCorrectly() public {
        vm.prank(artist);
        chainSound.AddTrack(
            "trap1",
            "WH",
            "preview-url",
            "full-url",
            PRICE
        );

        uint256 artistBalanceBefore = artist.balance;
        uint256 ownerBalanceBefore = owner.balance;

        vm.prank(buyer);
        chainSound.BuyTrack{value: PRICE}(0);

        uint256 fee = (PRICE * chainSound.platformFeePercent()) / 100;
        uint256 creatorAmount = PRICE - fee;

        assertEq(artist.balance, artistBalanceBefore + creatorAmount);
        assertEq(owner.balance, ownerBalanceBefore + fee);
    }

    function testBuyTrackRevertsWhenTrackDoesNotExist() public {
        vm.prank(buyer);
        vm.expectRevert(bytes("Track does not exist"));
        chainSound.BuyTrack{value: PRICE}(999);
    }

    function testBuyTrackRevertsWhenPriceIsIncorrect() public {
        vm.prank(artist);
        chainSound.AddTrack(
            "trap1",
            "WH",
            "preview-url",
            "full-url",
            PRICE
        );

        vm.prank(buyer);
        vm.expectRevert(bytes("Incorrect price"));
        chainSound.BuyTrack{value: 0.5 ether}(0);
    }

    function testBuyTrackRevertsWhenAlreadyPurchased() public {
        vm.prank(artist);
        chainSound.AddTrack(
            "trap1",
            "WH",
            "preview-url",
            "full-url",
            PRICE
        );

        vm.prank(buyer);
        chainSound.BuyTrack{value: PRICE}(0);

        vm.prank(buyer);
        vm.expectRevert(bytes("Already purchased"));
        chainSound.BuyTrack{value: PRICE}(0);
    }

    function testGetTrackRevertsWhenTrackDoesNotExist() public {
        vm.expectRevert(bytes("Track does not exist"));
        chainSound.getTrack(123);
    }

    function testSetPlatformFeePercentByOwner() public {
        chainSound.setPlatformFeePercent(10);
        assertEq(chainSound.platformFeePercent(), 10);
    }

    function testSetPlatformFeePercentRevertsWhenNotOwner() public {
        vm.prank(buyer);
        vm.expectRevert(bytes("Only owner"));
        chainSound.setPlatformFeePercent(10);
    }

    function testSetPlatformFeePercentRevertsWhenTooHigh() public {
        vm.expectRevert(bytes("Fee too high"));
        chainSound.setPlatformFeePercent(21);
    }
}