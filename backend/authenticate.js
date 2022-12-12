const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
	// console.log(req.cookies);
	// // const authHeader = req.headers["authorization"];
	// // const token = authHeader && authHeader.split(" ")[1];
	// const token = req.cookies.JWT;
	// if (token === null || token === "undefined") return res.sendStatus(401);
	// jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
	// 	if (err) return res.sendStatus(403);
	// 	req.user = user;
	// 	next();
	// });
}

module.exports = authenticate;
