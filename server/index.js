const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const http = require("http");
require('dotenv').config();
const { Server } = require("socket.io");
const { sequelize } = require("./models"); // Import Sequelize instance
const path = require('path');

app.use(express.json());
// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());



// Serve static files from the 'uploads' directory
app.use('/Images', express.static(path.join(__dirname, 'Images')));



// Chat server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);




  socket.on("join_room", (data) => {
    socket.join(data);

 

    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {

   
    
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3002, () => {
  console.log(" Chat SERVER RUNNING");
});



// Routes
const user = require("./routes/user");
app.use("/hakisha/user", user);

const incident = require("./routes/IncidentRoute");
app.use("/hakisha/incident", incident);

const detailsentry = require("./routes/GeneralDataRoute");
app.use("/hakisha/entry", detailsentry);

const chat = require("./routes/chat");
app.use("/hakisha/chat", chat);

const pie = require("./routes/dashboardFunctions");
app.use("/hakisha/pieCharts", pie);


const seedRole = require("./seeders/roleseeder");
const seedAgeGroup = require("./seeders/AgeGroupseeder");
const seedModeOfViolence = require("./seeders/ModeOfViolence");
const seedGender = require("./seeders/genderseeder"); // Import gender seeder
const seedRoomType = require("./seeders/roomtypeSeeder"); // Import room type seeder
const seedUsers = require("./seeders/DefaultuserSeeder")


db.sequelize.sync().then(async () => {
  try {
    const rolesCount = await sequelize.models.Role.count();
    if (rolesCount === 0) {
      // Perform seeding if the Role table is empty
      
      await seedRole();
    }

    const ageGroupCount = await sequelize.models.AgeGroup.count();
    if (ageGroupCount === 0) {
      // Perform seeding if the AgeGroup table is empty
      
      await seedAgeGroup();
    }

    const modeOfViolenceCount = await sequelize.models.ModeOfViolence.count();
    if (modeOfViolenceCount === 0) {
      // Perform seeding if the ModeOfViolence table is empty
      
      await seedModeOfViolence();
    }

    const genderCount = await sequelize.models.Gender.count();
    if (genderCount === 0) {
      // Perform seeding if the Gender table is empty
      await seedGender();
    }

    const roomTypeCount = await sequelize.models.RoomType.count();
    if (roomTypeCount === 0) {
      // Perform seeding if the RoomType table is empty
      await seedRoomType();
    }
    
    const defaultUser = await sequelize.models.User.count();
    if (defaultUser === 0) {
      // Perform seeding if the RoomType table is empty
      await seedUsers();
    }

  } catch (error) {
    console.error("Error checking or seeding data:", error);
  }

  app.listen(3001, () => {
    console.log("server running...");
  });
});