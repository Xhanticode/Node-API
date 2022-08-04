const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally
require("dotenv").config();
// Import routes
const userRoute = require("./routes/userRoute");

//Configure Server
const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 6969); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Dont let local development give errors

app.use(express.static("public")); //Calling public folder

//Calling my public folder
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/" + "index.html");
});

app.use("/users", userRoute);
// app.use("/users/:id", userRoute);

app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`);
  console.log("Press Ctrl+C to exit server");
});
