const User = require("../models/User");
const sendEmail = require("../sendEmail.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
const randomstring = require("randomstring");
const validatorEmail = require("email-validator");

class UserController {
	isLogged(req, res) {
		// res.redirect(`${process.env.APP_URL}/`);
		console.log(req.session);
		if (typeof req.session.user !== "undefined")
			return res.status(200).json({ message: "tak" });
		else return res.status(200).json({ message: "nie" });
	}
	async login(req, res) {
		const { email, password } = req.body;

		let userCheck;
		try {
			userCheck = await User.query()
				.select("id", "id_hash", "password", "isActive")
				.where("email", email);

			if (userCheck.length === 0) {
				return res.status(401).json({ message: "Błędny adres email" });
			}
		} catch (error) {
			console.log(error);
			res.send(error.message);
		}

		const validPassword = await bcrypt.compare(
			password,
			userCheck[0]["password"]
		);

		if (!validPassword)
			return res.status(401).json({ message: "Błędne hasło" });

		if (parseInt(userCheck[0]["isActive"]) === 0) {
			return res.status(401).json({ message: "Konto nie aktywne" });
		}

		req.session.user = userCheck[0]["id_hash"];
		console.log(req.session);
		res.status(200).json({ message: "zalogowany" });
		// res.redirect("/")
	}

	async test(req, res) {
		console.log(req.session);
		res.send("test");
	}
	async logout(req, res) {
		req.session.destroy();
		// res.send("wylogowany")
		res.status(200).json({ message: "wylogowany" });
		// res.redirect("/")
	}

	async registerUser(req, res) {
		try {
			const { email, password, password2 } = req.body;

			if (!validatorEmail.validate(email))
				return res.status(401).json({ message: "Błędny adres email" });

			if (password !== password2)
				return res.status(401).json({ message: "Hasła nie są identyczne" });

			const schema = new passwordValidator();
			schema
				// .is()
				// .min(8) // Minimum length 8
				// .has()
				// .symbols(1) // znak specjalny
				// .is()
				// .max(100) // Maximum length 100
				// .has()
				// .uppercase() // Must have uppercase letters
				// .has()
				// .lowercase() // Must have lowercase letters
				// .has()
				// .digits(2) // Must have at least 2 digits
				.has()
				.not()
				.spaces() // Should not have spaces
				.is()
				.not()
				.oneOf(["Password", "Password123"]);

			const validPassword = schema.validate(password);
			if (!validPassword)
				return res
					.status(401)
					.json({ message: "Hasło jest zbyt mało złożone" });

			const userCheck = await User.query()
				.select("id", "email", "password")
				.where("email", email);

			if (userCheck.length !== 0) {
				if (email === userCheck[0]["email"]) {
					return res.status(422).json({
						message: "Użytkownik o podanym adresie e-mail juz istnieje",
					});
				}
			}

			const id_hash = randomstring.generate(32);
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(password, salt);

			const secret = process.env.JWT_TOKEN + email;
			const payload = {
				id_hash,
			};

			const token = jwt.sign(payload, secret, { expiresIn: "10000s" });
			const link = `${process.env.API_URL}/confirm/${token}/${id_hash}`;
			sendEmail(email, "Aktywuj konto", link);

			const newUser = await User.query().insert({
				id_hash,
				email,
				password: hashPassword,
				isActive: 0,
			});
		} catch (err) {
			return res.status(422).json({ message: err.message });
		}

		res.send("send");
	}

	async confirmUser(req, res) {
		const { id, token } = req.params;
		try {
			const user = await User.query()
				.select("id_hash", "email", "password")
				.where("id_hash", id);

			if (id !== user[0]["id_hash"]) {
				return res.send("Brak uzytkownika");
			}

			const email = user[0]["email"];
			const secret = process.env.JWT_TOKEN + email;

			const payload = jwt.verify(token, secret);
			const userConfirm = await User.query()
				.where("id_hash", id)
				.patch({ isActive: 1 });
			res.redirect(`${process.env.APP_URL}/logowanie`);
		} catch (error) {
			console.log(error);
			res.send(error.message);
		}
	}

	async sendForgotPassword(req, res) {
		try {
			const { email } = req.body;

			const user = await User.query()
				.select("id_hash", "email", "password")
				.where("email", email);

			if (user.length === 0) {
				return res.status(422).json({
					message: "Brak użytkownika o podanym adresie email",
				});
			}

			const id_hash = user[0]["id_hash"];
			const secret = process.env.JWT_TOKEN + user[0]["password"];
			const payload = {
				email,
				id_hash,
			};
			const token = jwt.sign(payload, secret, { expiresIn: "10m" });
			const link = `${process.env.API_URL}/reset-password/${token}/${id_hash}`;
			sendEmail(email, "change password", link);
		} catch (err) {
			return res.status(422).json({ message: err.message });
		}
		return res.status(200).json({ message: "OK" });
	}

	async redirectForgotPassword(req, res) {
		console.log(req.params);
		const { id, token } = req.params;
		res.redirect(`${process.env.APP_URL}/resetuj-haslo/${token}/${id}`);
	}
	async changeForgotPassword(req, res) {
		const { id, token } = req.params;
		const { password, password2 } = req.body;
		console.log(req.params);
		console.log(req.body);
		try {
			if (password !== password2)
				return res.status(401).json({ message: "Hasła nie są identyczne" });

			const user = await User.query()
				.select("id_hash", "email", "password")
				.where("id_hash", id);

			if (user.length === 0) {
				return res.status(422).json({
					message: "Brak użytkownika",
				});
			}

			const secret = process.env.JWT_TOKEN + user[0]["password"];
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(password, salt);

			const payload = jwt.verify(token, secret);
			const userUpdate = await User.query()
				.where("id_hash", id)
				.patch({ password: hashPassword });

			res.redirect(`${process.env.APP_URL}/logowanie`);
		} catch (error) {
			console.log(error);
			res.send(error.message);
		}
	}

	async changePassword(req, res) {
		// const id = parseInt(req.session.user);
		const id = 3;
		const { password, newPassword, newPassword2 } = req.body;

		if (newPassword !== newPassword2)
			return res.status(401).json({ message: "Hasła nie są identyczne" });

		// const schema = new passwordValidator();
		// schema
		// 	.is()
		// 	.min(8) // Minimum length 8
		// 	.has()
		// 	.symbols(1) // znak specjalny
		// 	.is()
		// 	.max(100) // Maximum length 100
		// 	.has()
		// 	.uppercase() // Must have uppercase letters
		// 	.has()
		// 	.lowercase() // Must have lowercase letters
		// 	.has()
		// 	.digits(2) // Must have at least 2 digits
		// 	.has()
		// 	.not()
		// 	.spaces() // Should not have spaces
		// 	.is()
		// 	.not()
		// 	.oneOf(["Passw0rd", "Password123"]);

		// const validPassword = schema.validate(newPassword);
		// if (!validPassword)
		// 	return res.status(401).json({ message: "Hasło jest zbyt mało złożone" });

		try {
			const user = await User.query()
				.select("email", "password")
				.where("id", id);
		} catch (error) {
			console.log(error);
			res.send(error.message);
		}

		console.log(user[0]["password"]);

		const validPasswordInBase = await bcrypt.compare(
			password,
			user[0]["password"]
		);

		if (!validPasswordInBase)
			return res.status(401).json({ message: "Błędne hasło" });

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(newPassword, salt);

		try {
			const userUpdate = await User.query()
				.findById(id)
				.patch({ password: hashPassword });

			res.status(201).json(userUpdate);
		} catch (error) {
			console.log(error);
			res.send(error.message);
		}
	}

	async deleteUser(req, res) {
		// const id = req.session.user;
		const id = 2;
		try {
			const user = await User.query()
				.deleteById(id)
				.where("id", req.session.user);
		} catch (error) {
			console.log(error);
			res.send(error.message);
		}
		// res.redirect("/")
		res.sendStatus(204);
	}
}

module.exports = new UserController();
