"use strict";
const MongoClient = require('mongodb').MongoClient


module.exports = {
	connect: function () {

	},

	findNote: function (loanId) {
		var url = `mongodb://localhost:27017/business`;
		return new Promise((resolve, reject) => {
			// Use connect method to connect to the Server 
			MongoClient.connect(url, function(err, db) {
				
				var collection = db.collection('notes');

				collection.find({"LoanId": loanId}).toArray(function(err, docs) {
					docs.length > 0 ? resolve(true) : resolve(false);
				});

			  db.close();
			});
			
		});
	},
	getData: function () {
		var url = `mongodb://localhost:27017/business`;
		return new Promise((resolve, reject) => {
			// Use connect method to connect to the Server 
			MongoClient.connect(url, function(err, db) {
				
				var collection = db.collection('buys');

				collection.find({}).toArray(function(err, docs) {
					resolve(docs);
				});

			  db.close();
			});
			
		});
	},

	updateNote: function (obj, loadId) {
		console.log(obj)
		var url = `mongodb://localhost:27017/business`;
		return new Promise((resolve, reject) => {
			// Use connect method to connect to the Server 
			MongoClient.connect(url, function(err, db) {
				
				var collection = db.collection('notes');
				collection.update({"LoanId": loadId}, obj, (err, count, obj) => {
				})

			  db.close();
			});
			
		});
	},

	insertNote: function (obj) {
		var url = `mongodb://localhost:27017/business`;
		// Use connect method to connect to the Server 
		MongoClient.connect(url, function(err, db) {
			var collection = db.collection('buys');

			collection.insertOne(obj);

			db.close();
		});
	},

	find: function (loanId) {
		var url = `mongodb://localhost:27017/business`;
		return new Promise((resolve, reject) => {
			// Use connect method to connect to the Server 
			MongoClient.connect(url, function(err, db) {
				
				var collection = db.collection('currentLoans');

				collection.find({"loanId": loanId}).toArray(function(err, docs) {
					docs.length > 0 ? resolve(true) : resolve(false);
				});

			  db.close();
			});
			
		});
	},
	insert: function (loanId) {
			var url = `mongodb://localhost:27017/business`;
			// Use connect method to connect to the Server 
			MongoClient.connect(url, function(err, db) {
				
				var collection = db.collection('currentLoans');

				collection.insertOne({"loanId": loanId});

			  db.close();
			});
	}
}


