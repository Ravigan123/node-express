require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/route");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookie = require("cookie");
const path = require("path");
// const delArchive = require("./schedule/deleteArchive");
// const send = require("./schedule/send");
// const sendAlert = require("./schedule/sendAlert");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
const corsConfig = {
	origin: true,
	credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use("/api", router);

app.use(express.static(path.join(__dirname, "./build")));
app.use("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(process.env.PORT, function () {
	console.log("app is working...");
});
