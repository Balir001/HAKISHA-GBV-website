const express = require("express");
const router = express.Router();
const{GetMessage,
     UploadMessage,
     getChatsWithUsers,
     createRoomId,
     enterRoomMember,
     enterRoomTypes,
     GetConversation,
    // PostInboxparticipant,
    // generateInbox
}=require("../controller/chatController")
const {verifyToken} = require("../middleware/jwt")

const upload = require('../middleware/multer')







// inbox route
// router.post("/getOrCreateInbox",verifyToken,generateInbox);

//getmessages route
router.get("/getmessage",verifyToken,GetMessage);


//upload route
router.post("/uploadMessage",verifyToken, UploadMessage);

//get your chats
 router.get("/searchChats",verifyToken,getChatsWithUsers)

// insert client id and counselor id to create roomid
router.post("/createRoom",verifyToken,createRoomId);



// Submit RoomMember route
router.post("/submitRoomMember",verifyToken,enterRoomMember);

// Submit RoomMember route
router.post("/enterRoomTypes",enterRoomTypes);


// //GetConversation
router.get("/getConversation",verifyToken,GetConversation );

// // UpdateProfile
// router.put("/UpdateProfile",verifyToken,upload.single('image'),UpdateProfile );

// //DeleteProfile
// router.delete("/DeleteProfile",verifyToken,DeleteProfile );
 





module.exports = router;
