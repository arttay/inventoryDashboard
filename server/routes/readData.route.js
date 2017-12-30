const mongoService = require("../services/mongoService.js");


module.exports = function (app) {
	app.get('/readData', function (req, res) {
		mongoService.getData().then((data) => {
			res.send(data)
		})
	  
	})
}
