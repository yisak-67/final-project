// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

// Disable revert strings

contract LandRegistery {
    address adminAddress;

    constructor() {
        adminAddress = msg.sender;
        usersTotal++;
        allUsers[adminAddress] = User(
            adminAddress,
            "admin",
            "https://i.pinimg.com/564x/c2/65/4e/c2654e024c5d7b4f03f154469dabfd83.jpg",
            "admin@admin.com",
            "admin123",
            "+11111111111111111",
            false,
            "Addis Ababa",
            "Admin",
            true,
            false,
            block.timestamp
        );
        allUserAddresss[msg.sender] = true;
        userAddressList.push(msg.sender);
    }

    event LoginInfo(User user);
    event ErrorMessage(string message);
    event Success(string message);
    event LogoutEvent(bool status, string message);
    event LandVerified(uint landId, address verifiedBy, uint256 timestamp);

    error LandNotFound();
    error UserNotFound();
    error RequestNotFound();
    error TransferNotFound();


    // * receive function
    receive() external payable {}

    // * fallback function
    fallback() external payable {}

    enum UserType {
        Admin,
        Seller,
        Buyer
    }

    enum RequestStatus {
        requested,
        accepted,
        rejected,
        completed
    }

    struct Request {
        uint id;
        address sellerId;
        address buyerId;
        uint landId;
        bool isPaymentDone;
        RequestStatus status;
    }

    struct Land {
        uint id;
        string title;
        string documentHash;
        uint price;
        string locationAddress;
        string landAddress;
        address payable postedBy;
        string detail;
        uint256 postedDate;
        bool isVerified;
        uint area;
    }

    struct User {
        address id;
        string fullName;
        string profileHash;
        string email;
        string password;
        string phoneNumber;
        bool isLoggedIn;
        string addressLocation;
        string Role;
        bool isVerified;
        bool isBanned;
        uint256 dateJoined;
    }

    struct Transfer {
        uint id;
        uint requestId;
    }
    struct LandHistory {
        address userAddress;
        uint256 occupiedDate;
    }
    struct LandHistory2 {
        User user;
        uint256 occupiedDate;
    }
    uint public landsTotal;
    uint public usersTotal;
    uint public requestCount;
    User public currentUser;
    uint public transferTotal;

    mapping(uint => Land) public allLands;
    mapping(uint => bool) public allLandids;
    mapping(address => User) public allUsers;
    mapping(address => bool) public allUserAddresss;
    mapping(address => uint[]) public currentUserLands;
    mapping(uint => Transfer) public allTransfers;
    mapping(uint256 => LandHistory[]) public landHistories;
    address[] userAddressList;

    mapping(uint => Request) public allRequests;
    mapping(uint => bool) public allRequestids;
    mapping(uint => bool) public allTransfersIds;
    mapping(address => uint[]) public recievedRequests;
    mapping(address => uint[]) public sentRequests;

    
    
    modifier onlyAdmin() {
    require(msg.sender == adminAddress, "Only admin can perform this action");
    _;
}

// auth

    function checkifUserExist(address _userAddress) public view returns (bool) {
        if (allUserAddresss[_userAddress]) {
            return true;
        } else {
            return false;
        }
    }

    function registerUser(
        string memory _fullName,
        string memory _profileHash,
        string memory _email,
        string memory _password,
        string memory _addressLocation,
        string memory _phoneNumber,
        string memory _role
    ) public returns (bool) {
        usersTotal++;
        allUsers[msg.sender] = User(
            msg.sender,
            _fullName,
            _profileHash,
            _email,
            _password,
            _phoneNumber,
            false,
            _addressLocation,
            _role,
            false,
            false,
            block.timestamp
        );
        allUserAddresss[msg.sender] = true;
        userAddressList.push(msg.sender);
        emit Success("User is Registered");
        return true;
    }

    function login(string memory _email, string memory _password) public {
        require(allUsers[msg.sender].id == msg.sender);

        if (
            keccak256(abi.encodePacked(bytes(allUsers[msg.sender].email))) ==
            keccak256(abi.encodePacked(bytes(_email))) &&
            keccak256(abi.encodePacked(bytes(allUsers[msg.sender].password))) ==
            keccak256(abi.encodePacked(bytes(_password)))
        ) {
            allUsers[msg.sender].isLoggedIn = true;
            emit LoginInfo(allUsers[msg.sender]);
        } else {
            emit ErrorMessage("Invalid Credentials");
        }
    }

    function logout(address _id) public {
        require(allUsers[msg.sender].id == msg.sender);
        bool isUser = checkifUserExist(_id);
        if (isUser) {
            allUsers[_id].isLoggedIn = false;
            emit LogoutEvent(true, "log out");
        } else {
            emit LogoutEvent(false, "not logout");
        }
    }

    function getUser(address _id) public view returns (User memory) {
        bool isUser = checkifUserExist(_id);
        if (isUser) {
            return allUsers[_id];
        }
        revert UserNotFound();
    }

    function UpdateProfile(
        string memory _profileHash,
        string memory _email,
        string memory _password,
        string memory _addressLocation,
        string memory _fullName,
        string memory _phoneNumber
    ) public returns (bool) {
        require(allUsers[msg.sender].id == msg.sender);

        allUsers[msg.sender].profileHash = _profileHash;
        allUsers[msg.sender].fullName = _fullName;
        allUsers[msg.sender].email = _email;
        allUsers[msg.sender].password = _password;
        allUsers[msg.sender].addressLocation = _addressLocation;
        allUsers[msg.sender].phoneNumber = _phoneNumber;

        return true;
    }

    function verifyUser(address _userAddress) public returns (bool) {
        bool checkUser = checkifUserExist(_userAddress);
        if (checkUser) {
            allUsers[_userAddress].isVerified = true;
            return true;
        } else {
            return false;
        }
    }

    function grantRevoke(address _userAddress) public returns (bool) {
        bool checkUser = checkifUserExist(_userAddress);
        if (checkUser) {
            allUsers[_userAddress].isBanned = !allUsers[_userAddress].isBanned;
            return true;
        } else {
            return false;
        }
    }

    function getUsers() public view returns (User[] memory) {
        User[] memory users = new User[](usersTotal);
        uint count = 0;
        for (uint i = 0; i < usersTotal; i++) {
            User memory user = allUsers[userAddressList[i]];
            users[count] = user;
            count++;
        }
        return users;
    }

    //land
    function createLand(
        string memory _title,
        string memory _documentHash,
        uint _price,
        string memory _locationAddress,
        string memory _landAddress,
        string memory _detail,
        uint256 _postedDate,
        uint _area
    ) public returns (bool) {
        landsTotal++;
        allLands[landsTotal] = Land(
            landsTotal,
            _title,
            _documentHash,
            _price,
            _locationAddress,
            _landAddress,
            payable(msg.sender),
            _detail,
            _postedDate,
            false,
            _area
            
        );
        LandHistory memory history = LandHistory(msg.sender, block.timestamp);
        landHistories[landsTotal].push(history);
        allLandids[landsTotal] = true;
        currentUserLands[msg.sender].push(landsTotal);
        return true;
    }

    function checkIfLandExist(uint _id) public view returns (bool) {
        if (allLandids[_id]) {
            return true;
        } else {
            return false;
        }
    }

function verifyLand(uint _id) public onlyAdmin returns (bool) {
    require(checkIfLandExist(_id), "Land does not exist");
    require(!allLands[_id].isVerified, "Land already verified");
    
    allLands[_id].isVerified = true;
    emit LandVerified(_id, msg.sender, block.timestamp);
    return true;
}

    function updateLandInfo(
        uint id,
        uint _price,
        string memory _detail
    ) public returns (bool) {
        bool island = checkIfLandExist(id);
        if (island) {
            allLands[id].price = _price;
            allLands[id].detail = _detail;
        }

        return true;
    }

    function getLandsforCurrentUser(
        address userId
    ) public view returns (uint[] memory) {
        return currentUserLands[userId];
    }

    function getLand(uint _id) public view returns (Land memory) {
        bool isLand = checkIfLandExist(_id);
        if (isLand) {
            return allLands[_id];
        }
        revert LandNotFound();
    }

    //request

    function sendRequest(uint _landId) public returns (bool) {
        requestCount++;
        Land memory land = getLand(_landId);
        allRequests[requestCount] = Request(
            requestCount,
            land.postedBy,
            msg.sender,
            _landId,
            false,
            RequestStatus.requested
        );
        recievedRequests[land.postedBy].push(requestCount);
        sentRequests[msg.sender].push(requestCount);
        allRequestids[requestCount] = true;
        return true;
    }

    function getRequest(uint _id) public view returns (Request memory) {
        if (allRequestids[_id]) {
            return allRequests[_id];
        }
        revert RequestNotFound();
    }

    function getRecievedRequests() public view returns (uint[] memory) {
        return recievedRequests[msg.sender];
    }

    function getSentRequests() public view returns (uint[] memory) {
        return sentRequests[msg.sender];
    }

    function acceptRequest(uint _id) public {
        allRequests[_id].status = RequestStatus.accepted;
    }

    function rejectRequest(uint _id) public {
        allRequests[_id].status = RequestStatus.rejected;
    }

    // transfer

    function transferlandtitle(uint _requestId) public {
        transferTotal++;
        uint landId = allRequests[_requestId].landId;
        address buyerId = allRequests[_requestId].buyerId;
        allTransfers[transferTotal] = Transfer(transferTotal, _requestId);
        allLands[landId].postedBy = payable(buyerId);
        LandHistory memory history = LandHistory(buyerId, block.timestamp);
        landHistories[landId].push(history);
    }

    function getLandHistory(
        uint256 landId
    ) public view returns (LandHistory2[] memory) {
        LandHistory[] memory history = landHistories[landId];
        uint length = history.length;
        LandHistory2[] memory landHistory = new LandHistory2[](length);

        for (uint i = 0; i < length; i++) {
            LandHistory memory h = history[i];
            User memory user = getUser(h.userAddress);
            LandHistory2 memory h2 = LandHistory2(user, h.occupiedDate);
            landHistory[i] = h2;
        }
        return landHistory;
    }

    // payment
    function makePayment(uint _requestId) public payable {
        allRequests[_requestId].isPaymentDone = true;
        allLands[allRequests[_requestId].landId].postedBy.transfer(msg.value);
    }

    function makePaymentUpdate(
        address payable _recieverAddress
    ) public payable {
        _recieverAddress.transfer(msg.value);
    }
    // function getBalance() public view returns (uint) {
    //     return address(this).balance;

    // }
    // function withdraw(uint _amount) public {
    //     require(msg.sender == adminAddress, "Only admin can perform this action");
    //     require(_amount <= address(this).balance, "Insufficient balance");
    //     adminAddress.transfer(_amount);
    // }
    //add more recent transaction
    //add more recent transaction
    function getRecentTransactions() public view returns (Transfer[] memory) {
        Transfer[] memory transfers = new Transfer[](transferTotal);
        uint count = 0;
        for (uint i = 0; i < transferTotal; i++) {
            Transfer memory transfer = allTransfers[i];
            transfers[count] = transfer;
            count++;
        }
        return transfers;
    }

    function getRecentRequests() public view returns (Request[] memory) {
        Request[] memory requests = new Request[](requestCount);
        uint count = 0;
        for (uint i = 0; i < requestCount; i++) {
            Request memory request = allRequests[i];
            requests[count] = request;
            count++;
        }
        return requests;
    }
}