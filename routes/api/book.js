const express = require("express");
const router = express.Router();
const Diary = require("../../models/diary");
const User = require("../../models/user");

router.post("/diary", (req, res) => {
	const text = req.body.text;
	let newText = {
		text
	};
	Diary.create(newText)
		.then(() => res.send(newText))
		.catch(function(err) {
			console.log(err);
			res.json(err);
		});
});

router.get("/diary/:_id", (req, res) => {
	console.log(res);
	// console.log(res)
	return Diary.findOne({
		_id: req.params._id
	})
		.then(function(dbDiary) {
			if (typeof dbDiary === "object") {
				res.json(dbDiary);
			}
		})
		.catch(function(err) {
			reject(err);
		});
});

router.post("/users/:_id", function(req, res) {
	Diary.create(req.body)
		.then(function(dbDiary) {
			// console.log(dbEvent);
			return User.findOneAndUpdate(
				{ _id: req.params._id },
				{
					$push: { text: dbDiary._id }
				},
				{ new: true }
			);
		})
		.then(function(dbUser) {
			res.json(dbUser);
		})
		.catch(function(err) {
			res.json(err);
		});
});

router.get("/diaryAll", (req, res) => {
	Diary.find()
		.then(dbDiary => {
			res.json(dbDiary);
		})
		.catch(err => res.json(err));
});

module.exports = router;
