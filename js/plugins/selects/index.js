(function (routes) {

	var express 	= require("express");
	var auth		= require("../auth/routes");
	var contagemPf	= require("../contagem_pf/routes");

	routes.init = function (app) {

		/*
		app.use(function(req, res, next) {
			var data = '';
			req.setEncoding('utf8');
			req.on('data', function(chunk) { 
				data += chunk;
			});
			
			req.on('end', function() {
				req.rawBody = JSON.parse(data);
				console.log(data);
				next();
			});
			
		});
		*/


		var router = express.Router();

		//auth.init(app);
		contagemPf.init(app);

	};

})(module.exports);