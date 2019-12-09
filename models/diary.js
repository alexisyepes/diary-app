const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diarySchema = new Schema({
	text: { type: String, required: true }
});

const Diary = mongoose.model("Diary", diarySchema);

module.exports = Diary;
