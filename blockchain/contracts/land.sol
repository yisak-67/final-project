// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract LandRegistry {
    // Contract owner (super admin)
    address public superAdmin;
    
    // Admins mapping
    mapping(address => bool) public admins;
    
    // User roles
    enum UserRole {
        SuperAdmin,
        Admin,
        Seller,
        Buyer
    }
    
    // Request status
    enum RequestStatus {
        Requested,
        Accepted,
        Rejected,
        Completed
    }

    // Land structure
    struct Land {
        uint id;
        string title;
        string documentHash;
        uint price;
        string locationAddress;
        string landAddress;
        address payable owner;
        string detail;
        uint256 postedDate;
        bool isVerified;
        uint area;
    }

    // User structure
    struct User {
        address id;
        string fullName;
        string profileHash;
        string email;
        string password;
        string phoneNumber;
        bool isLoggedIn;
        string addressLocation;
        UserRole role;
        bool isVerified;
        bool isBanned;
        uint256 dateJoined;
    }

    // Request structure
    struct Request {
        uint id;
        address seller;
        address buyer;
        uint landId;
        bool isPaymentDone;
        RequestStatus status;
    }

    // Transfer structure
    struct Transfer {
        uint id;
        uint requestId;
    }

    // Land history structure
    struct LandHistory {
        address userAddress;
        uint256 occupiedDate;
    }

    // State variables
    uint public landCount;
    uint public userCount;
    uint public requestCount;
    uint public transferCount;
    
    // Mappings
    mapping(uint => Land) public lands;
    mapping(address => User) public users;
    mapping(address => bool) public registeredUsers;
    mapping(address => uint[]) public userLands;
    mapping(uint => Request) public requests;
    mapping(uint => Transfer) public transfers;
    mapping(uint => LandHistory[]) public landHistories;
    mapping(address => uint[]) public receivedRequests;
    mapping(address => uint[]) public sentRequests;
    
    // Arrays
    address[] public userAddresses;

    // Events
    event UserRegistered(address indexed userAddress, string fullName);
    event UserLoggedIn(address indexed userAddress);
    event UserLoggedOut(address indexed userAddress);
    event LandAdded(uint indexed landId, address indexed owner);
    event LandVerified(uint indexed landId, address verifiedBy);
    event RequestSent(uint indexed requestId, address indexed buyer, address indexed seller);
    event RequestStatusChanged(uint indexed requestId, RequestStatus status);
    event TransferCompleted(uint indexed transferId, uint indexed landId, address newOwner);
    event AdminAdded(address indexed adminAddress, address addedBy);
    event AdminRemoved(address indexed adminAddress, address removedBy);
    event UserVerified(address indexed userAddress, address verifiedBy);
    event UserBanned(address indexed userAddress, bool isBanned, address actionBy);
    event LandUpdated(uint indexed landId, address updatedBy);

    // Errors
    error Unauthorized();
    error UserAlreadyExists();
    error UserNotFound();
    error LandNotFound();
    error RequestNotFound();
    error InvalidRequest();
    error AlreadyVerified();
    error NotVerified();
    error PaymentRequired();
    error InvalidAmount();
    error AlreadyBanned();
    error NotBanned();

    // Modifiers
    modifier onlySuperAdmin() {
        if (msg.sender != superAdmin) revert Unauthorized();
        _;
    }

    modifier onlyAdmin() {
        if (!admins[msg.sender] && msg.sender != superAdmin) revert Unauthorized();
        _;
    }

    modifier onlyRegisteredUser() {
        if (!registeredUsers[msg.sender]) revert UserNotFound();
        _;
    }

    modifier onlyLandOwner(uint _landId) {
        if (lands[_landId].owner != msg.sender) revert Unauthorized();
        _;
    }

    constructor() {
        superAdmin = msg.sender;
        
        // Initialize super admin user
        users[msg.sender] = User({
            id: msg.sender,
            fullName: "Super Admin",
            profileHash: "https://i.pinimg.com/564x/c2/65/4e/c2654e024c5d7b4f03f154469dabfd83.jpg",
            email: "superadmin@admin.com",
            password: "12345678",
            phoneNumber: "+11111111111",
            isLoggedIn: false,
            addressLocation: "arbamunch",
            role: UserRole.SuperAdmin,
            isVerified: true,
            isBanned: false,
            dateJoined: block.timestamp
        });
        
        registeredUsers[msg.sender] = true;
        userAddresses.push(msg.sender);
        userCount++;
    }

    // Admin management functions
    function addAdmin(address _adminAddress) external onlySuperAdmin {
        require(_adminAddress != address(0), "Invalid address");
        require(!admins[_adminAddress], "Already an admin");
        
        admins[_adminAddress] = true;
        
        // Update user role if registered
        if (registeredUsers[_adminAddress]) {
            users[_adminAddress].role = UserRole.Admin;
        } else {
            // Register the admin if not already registered
            users[_adminAddress] = User({
                id: _adminAddress,
                fullName: "Admin",
                profileHash: "",
                email: "",
                password: "",
                phoneNumber: "",
                isLoggedIn: false,
                addressLocation: "",
                role: UserRole.Admin,
                isVerified: true,
                isBanned: false,
                dateJoined: block.timestamp
            });
            registeredUsers[_adminAddress] = true;
            userAddresses.push(_adminAddress);
            userCount++;
        }
        
        emit AdminAdded(_adminAddress, msg.sender);
    }

    function removeAdmin(address _adminAddress) external onlySuperAdmin {
        require(_adminAddress != superAdmin, "Cannot remove super admin");
        require(admins[_adminAddress], "Not an admin");
        
        admins[_adminAddress] = false;
        
        // Update user role if registered
        if (registeredUsers[_adminAddress]) {
            users[_adminAddress].role = UserRole.Buyer;
        }
        
        emit AdminRemoved(_adminAddress, msg.sender);
    }

    // User management functions
    function registerUser(
        string memory _fullName,
        string memory _profileHash,
        string memory _email,
        string memory _password,
        string memory _addressLocation,
        string memory _phoneNumber,
        UserRole _role
    ) external {
        if (registeredUsers[msg.sender]) revert UserAlreadyExists();
        if (_role == UserRole.SuperAdmin || _role == UserRole.Admin) revert Unauthorized();
        
        users[msg.sender] = User({
            id: msg.sender,
            fullName: _fullName,
            profileHash: _profileHash,
            email: _email,
            password: _password,
            phoneNumber: _phoneNumber,
            isLoggedIn: false,
            addressLocation: _addressLocation,
            role: _role,
            isVerified: false,
            isBanned: false,
            dateJoined: block.timestamp
        });
        
        registeredUsers[msg.sender] = true;
        userAddresses.push(msg.sender);
        userCount++;
        
        emit UserRegistered(msg.sender, _fullName);
    }

    function verifyUser(address _userAddress) external onlyAdmin {
        if (!registeredUsers[_userAddress]) revert UserNotFound();
        if (users[_userAddress].isVerified) revert AlreadyVerified();
        
        users[_userAddress].isVerified = true;
        emit UserVerified(_userAddress, msg.sender);
    }

    function banUser(address _userAddress, bool _banStatus) external onlyAdmin {
        if (!registeredUsers[_userAddress]) revert UserNotFound();
        if (_userAddress == superAdmin) revert Unauthorized();
        if (users[_userAddress].isBanned == _banStatus) {
            if (_banStatus) {
                revert AlreadyBanned();
            } else {
                revert NotBanned();
            }
        }
        
        users[_userAddress].isBanned = _banStatus;
        emit UserBanned(_userAddress, _banStatus, msg.sender);
    }

    function updateUserProfile(
        string memory _fullName,
        string memory _profileHash,
        string memory _email,
        string memory _password,
        string memory _addressLocation,
        string memory _phoneNumber
    ) external onlyRegisteredUser {
        if (users[msg.sender].isBanned) revert Unauthorized();
        
        User storage user = users[msg.sender];
        user.fullName = _fullName;
        user.profileHash = _profileHash;
        user.email = _email;
        user.password = _password;
        user.addressLocation = _addressLocation;
        user.phoneNumber = _phoneNumber;
    }

    function login(string memory _email, string memory _password) external {
        if (!registeredUsers[msg.sender]) revert UserNotFound();
        User storage user = users[msg.sender];
        
        if (user.isBanned) revert Unauthorized();
        if (keccak256(abi.encodePacked(user.email)) != keccak256(abi.encodePacked(_email)) || 
            keccak256(abi.encodePacked(user.password)) != keccak256(abi.encodePacked(_password))) {
            revert Unauthorized();
        }
        
        user.isLoggedIn = true;
        emit UserLoggedIn(msg.sender);
    }

    function logout() external onlyRegisteredUser {
        users[msg.sender].isLoggedIn = false;
        emit UserLoggedOut(msg.sender);
    }

    // Land management functions
    function addLand(
        string memory _title,
        string memory _documentHash,
        uint _price,
        string memory _locationAddress,
        string memory _landAddress,
        string memory _detail,
        uint _area
    ) external onlyRegisteredUser returns (uint) {
        if (users[msg.sender].isBanned) revert Unauthorized();
        
        landCount++;
        
        lands[landCount] = Land({
            id: landCount,
            title: _title,
            documentHash: _documentHash,
            price: _price,
            locationAddress: _locationAddress,
            landAddress: _landAddress,
            owner: payable(msg.sender),
            detail: _detail,
            postedDate: block.timestamp,
            isVerified: false,
            area: _area
        });
        
        // Add to user's lands
        userLands[msg.sender].push(landCount);
        
        // Add to land history
        landHistories[landCount].push(LandHistory({
            userAddress: msg.sender,
            occupiedDate: block.timestamp
        }));
        
        emit LandAdded(landCount, msg.sender);
        
        return landCount;
    }

    function updateLand(
        uint _landId,
        string memory _title,
        string memory _documentHash,
        uint _price,
        string memory _detail,
        uint _area
    ) external onlyRegisteredUser onlyLandOwner(_landId) {
        if (!lands[_landId].isVerified) revert NotVerified();
        
        lands[_landId].title = _title;
        lands[_landId].documentHash = _documentHash;
        lands[_landId].price = _price;
        lands[_landId].detail = _detail;
        lands[_landId].area = _area;
        
        emit LandUpdated(_landId, msg.sender);
    }

    function verifyLand(uint _landId) external onlyAdmin {
        if (_landId == 0 || _landId > landCount) revert LandNotFound();
        if (lands[_landId].isVerified) revert AlreadyVerified();
        
        lands[_landId].isVerified = true;
        emit LandVerified(_landId, msg.sender);
    }

    // Request and transfer functions
    function sendRequest(uint _landId) external onlyRegisteredUser returns (uint) {
        if (users[msg.sender].isBanned) revert Unauthorized();
        if (_landId == 0 || _landId > landCount) revert LandNotFound();
        if (!lands[_landId].isVerified) revert NotVerified();
        if (lands[_landId].owner == msg.sender) revert InvalidRequest();
        
        requestCount++;
        
        requests[requestCount] = Request({
            id: requestCount,
            seller: lands[_landId].owner,
            buyer: msg.sender,
            landId: _landId,
            isPaymentDone: false,
            status: RequestStatus.Requested
        });
        
        sentRequests[msg.sender].push(requestCount);
        receivedRequests[lands[_landId].owner].push(requestCount);
        
        emit RequestSent(requestCount, msg.sender, lands[_landId].owner);
        
        return requestCount;
    }

    function respondToRequest(uint _requestId, bool _accept) external onlyRegisteredUser {
        if (_requestId == 0 || _requestId > requestCount) revert RequestNotFound();
        Request storage request = requests[_requestId];
        
        if (request.seller != msg.sender) revert Unauthorized();
        if (request.status != RequestStatus.Requested) revert InvalidRequest();
        
        request.status = _accept ? RequestStatus.Accepted : RequestStatus.Rejected;
        emit RequestStatusChanged(_requestId, request.status);
    }

    function makePayment(uint _requestId) external payable onlyRegisteredUser {
        if (users[msg.sender].isBanned) revert Unauthorized();
        if (_requestId == 0 || _requestId > requestCount) revert RequestNotFound();
        Request storage request = requests[_requestId];
        
        if (request.buyer != msg.sender) revert Unauthorized();
        if (request.status != RequestStatus.Accepted) revert InvalidRequest();
        if (request.isPaymentDone) revert InvalidRequest();
        
        // Verify payment amount
        uint landPrice = lands[request.landId].price;
        if (msg.value < landPrice) revert InvalidAmount();
        
        // Transfer funds to seller
        (bool success, ) = request.seller.call{value: landPrice}("");
        require(success, "Payment failed");
        
        // Refund excess payment
        if (msg.value > landPrice) {
            (success, ) = msg.sender.call{value: msg.value - landPrice}("");
            require(success, "Refund failed");
        }
        
        request.isPaymentDone = true;
    }

    function completeTransfer(uint _requestId) external onlyRegisteredUser {
        if (_requestId == 0 || _requestId > requestCount) revert RequestNotFound();
        Request storage request = requests[_requestId];
        
        if (request.buyer != msg.sender) revert Unauthorized();
        if (request.status != RequestStatus.Accepted) revert InvalidRequest();
        if (!request.isPaymentDone) revert PaymentRequired();
        
        // Transfer ownership
        lands[request.landId].owner = payable(msg.sender);
        
        // Record transfer
        transferCount++;
        transfers[transferCount] = Transfer({
            id: transferCount,
            requestId: _requestId
        });
        
        // Update land history
        landHistories[request.landId].push(LandHistory({
            userAddress: msg.sender,
            occupiedDate: block.timestamp
        }));
        
        // Update request status
        request.status = RequestStatus.Completed;
        
        // Update user lands
        userLands[msg.sender].push(request.landId);
        
        // Remove from seller's lands
        uint[] storage sellerLands = userLands[request.seller];
        for (uint i = 0; i < sellerLands.length; i++) {
            if (sellerLands[i] == request.landId) {
                sellerLands[i] = sellerLands[sellerLands.length - 1];
                sellerLands.pop();
                break;
            }
        }
        
        emit TransferCompleted(transferCount, request.landId, msg.sender);
        emit RequestStatusChanged(_requestId, RequestStatus.Completed);
    }

    // View functions
    function getUser(address _userAddress) external view returns (User memory) {
        if (!registeredUsers[_userAddress]) revert UserNotFound();
        return users[_userAddress];
    }

    function getLand(uint _landId) external view returns (Land memory) {
        if (_landId == 0 || _landId > landCount) revert LandNotFound();
        return lands[_landId];
    }

    function getRequest(uint _requestId) external view returns (Request memory) {
        if (_requestId == 0 || _requestId > requestCount) revert RequestNotFound();
        return requests[_requestId];
    }

    function getTransfer(uint _transferId) external view returns (Transfer memory) {
        if (_transferId == 0 || _transferId > transferCount) revert RequestNotFound();
        return transfers[_transferId];
    }

    function getUserLands(address _userAddress) external view returns (uint[] memory) {
        return userLands[_userAddress];
    }

    function getLandHistory(uint _landId) external view returns (LandHistory[] memory) {
        if (_landId == 0 || _landId > landCount) revert LandNotFound();
        return landHistories[_landId];
    }

    function getReceivedRequests() external view onlyRegisteredUser returns (uint[] memory) {
        return receivedRequests[msg.sender];
    }

    function getSentRequests() external view onlyRegisteredUser returns (uint[] memory) {
        return sentRequests[msg.sender];
    }

    function getAllUsers() external view onlyAdmin returns (User[] memory) {
        User[] memory allUsers = new User[](userCount);
        for (uint i = 0; i < userCount; i++) {
            allUsers[i] = users[userAddresses[i]];
        }
        return allUsers;
    }

    function getAllLands() external view returns (Land[] memory) {
        Land[] memory allLands = new Land[](landCount);
        for (uint i = 1; i <= landCount; i++) {
            allLands[i-1] = lands[i];
        }
        return allLands;
    }

    function getAllRequests() external view onlyAdmin returns (Request[] memory) {
        Request[] memory allRequests = new Request[](requestCount);
        for (uint i = 1; i <= requestCount; i++) {
            allRequests[i-1] = requests[i];
        }
        return allRequests;
    }

    function getAllTransfers() external view onlyAdmin returns (Transfer[] memory) {
        Transfer[] memory allTransfers = new Transfer[](transferCount);
        for (uint i = 1; i <= transferCount; i++) {
            allTransfers[i-1] = transfers[i];
        }
        return allTransfers;
    }

    // Fallback functions
    receive() external payable {}
    fallback() external payable {}
}