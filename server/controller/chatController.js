const { v4: uuidv4 } = require("uuid"); // Import the UUID library
const { v5: uuidv5 } = require('uuid');


const {
 
  Message,
  User,
  Profile,
  Room,
  RoomMember,
  RoomType,
  Role,
  Specialization,
  Organization,
  Gender
} = require("../models");
const { Op } = require("sequelize");

module.exports = {

  enterRoomTypes: async (req, res) => {
    try {
        const { roomType } = req.body;

        // Validate the received data
        if (!roomType || typeof roomType !== 'string' || roomType.trim() === '') {
            return res.status(400).json({ error: 'Invalid room type provided.' });
        }

        // Create a new room type record in the database
        const newRoomType = await RoomType.create({
            RoomType: roomType.trim() // Trim any leading or trailing whitespace
        });

        // Return success response
        return res.status(201).json({ message: 'Room type created successfully.', roomType: newRoomType });
    } catch (error) {
        // Handle any errors (e.g., database issues, validation errors)
        console.error('Error creating room type:', error);
        return res.status(500).json({ error: 'Failed to create room type.' });
    }
},
  GetMessage: async (req, res) => {
    const userId = req.body;

    try {
      const user = await User.findOne({
        where: { id: userId, Is_Active: true },
        include: Message,
      });
      res.json(Message);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  GetConversation :async(req,res)=>{
    const userId = req.userId; //from jwt for authentication

    try {
      const { roomId } = req.query; // Assuming you're sending the roomId from the frontend
     console.log(` the room id is ${roomId}`)
      if (!roomId) {
        return res.status(400).json({ error: 'Room ID is required' });
      }
  
      const room = await Room.findByPk(roomId, {
        include: [
          {
            model: RoomMember,
            include: [
              {
                model: Profile,
                include: [
                  {
                    model: Message,
                    where: { Room_Id: roomId },
                    order: [['createdAt', 'ASC']], // Order messages by creation date
                  },
                ],
              },
            ],
          },
        ],
      });
  
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
  
      const conversations = room.RoomMembers.map((member) => ({
        profile: {
          id: member.Profile.id,
          firstName: member.Profile.firstName,
          lastName: member.Profile.lastName,
          middleName: member.Profile.middleName,
        },
        messages: member.Profile.Messages,
      }));
  
      res.json({ conversations });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

  },

  UploadMessage: async (req, res) => {
    const { currentMessage,roomId } = req.body;
    const userId = req.userId; // Assuming the user ID is stored in req.user

    // console.log(currentMessage,roomId);
    try {
      const user = await User.findOne({
        where: { id: userId },
        include: Profile, // Assuming Profile is correctly defined and associated with User
      });

      if (!user) {
        console.log("User not found");
        return res.status(404).json({ error: "User not found" });
      }

      // Assuming user.Profile is defined and contains the profile
      console.log(user.Profile);
      console.log(`the user profileId in message upload is:${user.Profile.id}`)

      //insert message
      const uploadMessage = await Message.create({
        Sender_Id: user.Profile.id,
        message: currentMessage,
        Room_Id:roomId,
      });

      res.json({ message: "success" });
    } catch (error) {
      console.error("Error uploading message:", error);
      res.status(500).json({ error: error.message });
    }
  },


  
  createRoomId: async (req, res) => {
    const NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
    try {
      const { profile } = req.body;
      const userId = req.userId;
  
      const user = await User.findOne({
        where: { id: userId },
        include: Profile,
      });
  
      const combinedId = `${profile.id}-${user.Profile.id}`;
      const roomNamespaceId = uuidv5(combinedId, NAMESPACE);
  
      // Check if the room ID already exists in the database
      const existingRoom = await Room.findOne({ where: { id: roomNamespaceId } });
      let roomId;
  
      if (existingRoom) {
        // If the room ID already exists, return an object with roomId and roomExists flag
        const roomData = { roomId: existingRoom.id, roomExists: true };
        return res.status(200).json(roomData);
      } else {
        // Otherwise, create a new room and use its ID
        const myRoom = await Room.create({
          id: roomNamespaceId,
          Room_Type: "1", // Adjust as needed
        });
        roomId = myRoom.id;
      }
  
      // Respond with the room ID (either existing or newly created)
      return res.status(200).json(roomId );
    } catch (error) {
      console.error("Error creating room:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  

  enterRoomMember:async (req, res) => {
    try {
        const messageSenderId = req.userId; // Get the ID of the message sender from JWT
        const { messageReceiverId, room } = req.body;

        console.log(`the message receiver is${messageReceiverId}`)
        


        // // Check if the room ID exists in the RoomMember table
        // const existingRoom = await RoomMember.findOne({
        //     where: { Room_Id: room.roomId}
        // });

        // if (existingRoom) {
        //     // Room ID already exists in RoomMember table
        //     return res.status(200).json({ message: "Room membership already assigned." });
        // }

        // Find the profile of the message sender (counselor/Support seeker) and include the associated profile
        const user = await User.findOne({
            where: { id: messageSenderId },
            include: [{ model: Profile }],
        });

        if (!user.Profile) {
            // Handle case where profile not found
            return res.status(404).json({ error: "Message sender profile not found." });
        }
        console.log(`the message sender is${user.Profile.id}`)

        // Create a RoomMember row for the counselor/support seeker (message sender)
        //include an upsert
        await RoomMember.create({
            Profile_Id: user.Profile.id,
            Room_Id: room,
        });

        // Create a RoomMember row for the councelor/support seeker (message receiver)
        //include an upsert
        await RoomMember.create({
            Profile_Id: messageReceiverId,
            Room_Id: room,
        });

        // Respond with success message and email of the message sender
        // res.status(200).json({
        //     message: "Room members added successfully.",
        //     messageSenderEmail: user.Email, // Assuming email is a property of the User model
        // });
        // console.log(messageSenderEmail)
    } catch (error) {
        // Handle any errors (e.g., database issues, validation errors)
        console.error("Error adding room members:", error);
        res.status(500).json({ error: "Failed to add room members." });
    }
}
,

getChatsWithUsers: async (req, res) => {
  const userId = req.userId;
  try {
    // const mainProfileId = req.params.profileId; // Assuming you pass the profile ID as a route parameter
    const user = await User.findOne({
      where: { id: userId },
      include: [{ model: Profile }],
    });
    // Find the room associated with the main profile
    const roomMember = await RoomMember.findOne({
      where: { Profile_Id: user.Profile.id },
      include: [{ model: Profile }],
    });
    if (!roomMember) {
      console.log("user profile not found");
      return res
        .status(202)
        .json({ error: "Main profile not found in any room." });
    }

    // Find other room members in the same room (excluding the main profile)
    const otherRoomMembers = await RoomMember.findAll({
      where: {
        Room_Id: roomMember.Room_Id,
        Profile_Id: { [Op.not]: user.Profile.id },
      },
      include: [
        {
          model: Profile,
          include: [
            { model: Role }, 
            { model: Gender },// Include Role association
            { model: Organization }, // Include Organization association
            { model: Specialization}, // Include Specialization association
          ],
        },
      ],
    });
 // Extract relevant information (firstName, lastName, email, role, organization, specializations) from other profiles
 const sharedProfiles = otherRoomMembers.map((member) => ({
  firstName: member.Profile.firstName,
  lastName: member.Profile.lastName,
  email: member.Profile.email,
  role: member.Profile.Role.TypeOfRole, // Include the role
  // gender: member.Profile.Gender.Gender, // Include the role
  // organization: member.Profile.Organization.Name, // Include the organization
  // specializations: member.Profile.Specializations.map(
  //   (specialization) => specialization.type
  // ), // Include the specializations
  roomId: member.Room_Id, // Add the roomId to the response
}));
    return res.json(sharedProfiles);
  } catch (error) {
    console.error("Error fetching shared profiles:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
},
};
