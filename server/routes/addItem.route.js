const mongoService = require("../services/mongoService.js");


module.exports = function (app) {
	app.post('/addItem', function (req, res) {
		const data = req.body.data;

		mongoService.insertNote(data);

		res.send("shoo")
	})
}