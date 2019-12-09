const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, required: true },
	firstName: { type: String, required: true },
	password: { type: String },
	email: { type: String, required: true },
	text: [{ type: Schema.Types.ObjectId, ref: "Diary" }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
