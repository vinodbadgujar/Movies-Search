var express = require("express");
var app = express();

var request = require("request");

app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function (req,res) {
	res.render("search");
});

app.get("/results",function (req,res) {
	var movie_search = req.query.movie;
	var url="http://www.omdbapi.com/?apikey=thewdb&s="+ movie_search;
	request(url,function (error,response,body) {
		if (error) {
			res.send("Something went wrong.....  " + error);
		} else {
			if (response.statusCode=200) {
				var data = JSON.parse(body);
				res.render("results",{data:data}); 
			}
			else{
				res.send("The Movie name not found.");
			}
		}
	});
});

app.listen("3000","localhost",function () {
	console.log("Server has started.....");
});