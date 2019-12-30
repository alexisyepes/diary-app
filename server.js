const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
// const routes = require("./routes");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const usersRouter = require("./routes/api/users");
const diaryRouter = require("./routes/api/book");

app.use(cors());
// Passport Config
require("./passport/passport")(passport);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());

//Passport Config
app.use(passport.initialize());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use("/auth", usersRouter);
app.use("/", diaryRouter);

// Connect to the Mongo DB
mongoose.connect(
	`mongodb+srv://alexisyepes:${process.env.MONGO_ATLAS}@cluster0-b5sgz.mongodb.net/test?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true
	}
);

// Send every request to the React app
// Define any API routes before this runs
// Start the API server
app.listen(PORT, function() {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
