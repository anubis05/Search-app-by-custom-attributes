var express = require('express');
var usergrid = require('usergrid');
var config = require('./config');
var Client = require('node-rest-client').Client;


// Set up Express environment and enable it to read and write JavaScript
var app = express();
app.use(express.bodyParser());

// Initialize Usergrid
 usergridClient = new Client();
var usergridClient = new usergrid.client({
	'orgName' : config.organization,
	'appName' : config.application,
	'clientId' : config.clientId,
	'clientSecret' : config.clientSecret,
	'authType' : usergrid.AUTH_CLIENT_ID,
	logging : config.logging
});


// The API starts here

// GET /

var rootTemplate = {
	'employees' : {
		'href' : './employees'
	}
};

app.get('/migrate-edge-app',function(req,resp){
	console.log("here");
	client = new Client();
	var args = {
	  headers:{"Authorization": config.base64encodedCredentials}
	};
	var url="https://api.enterprise.apigee.com/v1/o/pixvy/apps/"+req.query.appId
	client.get(url, args,function(data, response){
		          console.log("inside client.get");
							// parsed response body as js object
							//console.log(data);
							// raw response
							console.log(data);
              createProfile(data,req,resp);

								resp.send("All you asked for is done :) ");
							});
					});

// GET /profiles

app.get('/profiles', function(req, res) {
		getProfiles(req, res);
});

function createProfile(e, req, res) {
	var opts = {
		type : 'bboards',
		name : e.id
	};


	usergridClient.createEntity(opts, function(err, o) {
		if (err) {
			res.jsonp(500, err);
			return;
		}
		o.set(e);
		o.save(function(err) {
			if (err) {
				res.jsonp(500, err);
				return;
			}
			res.send(201);
		});
	});
}

// Listen for requests until the server is stopped

app.listen(process.env.PORT || 9000);
console.log('The server is running!');
