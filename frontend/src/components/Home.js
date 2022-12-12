import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { MDBInput } from "mdb-react-ui-kit";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function Home() {
	axios.defaults.withCredentials = true;
	// axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
	// 	"access_token"
	// )}`;
	const navigate = useNavigate();
	const location = useLocation();
	const [email, setEmail] = useState("");
	const [sendInfo, setSendInfo] = useState(false);
	const [ip, setIp] = useState("");
	const [errors, setErrors] = useState({});

	useEffect(() => {
		isLogged();
	}, []);

	async function isLogged() {
		let err;
		// console.log(Cookies.get("access_token"));
		try {
			await axios.get(`${process.env.REACT_APP_API_URL}test`).then((res) => {
				console.log(res.data);
			});
		} catch (error) {
			if (error.response.data === undefined)
				err = "No connection to the server";
			else err = error.response.data.message;
		}
		return err;
	}

	// async function ForgotBase(user) {
	// 	let err;
	// 	try {
	// 		await axios.post(`${process.env.REACT_APP_API_URL}forgot-password`, user);
	// 	} catch (error) {
	// 		if (error.response.data === undefined)
	// 			err = "No connection to the server";
	// 		else err = error.response.data.message;
	// 	}
	// 	return err;
	// }

	// const handleEmail = (event) => {
	// 	setEmail(event.target.value);
	// 	if (!!errors[email])
	// 		setErrors({
	// 			...errors,
	// 			[email]: null,
	// 		});
	// };

	// const validateForm = (backandValid) => {
	// 	const newErrors = {};
	// 	if (backandValid === "Brak użytkownika o podanym adresie email")
	// 		newErrors.email = backandValid;

	// 	return newErrors;
	// };

	// async function forgotSend(e) {
	// 	setSendInfo(false);
	// 	e.preventDefault();

	// 	const user = {
	// 		email,
	// 	};
	// 	const backandValid = await ForgotBase(user);
	// 	const formErrors = validateForm(backandValid);

	// 	if (Object.keys(formErrors).length > 0) setErrors(formErrors);
	// 	else {
	// 		setSendInfo(true);
	// 		setEmail("");
	// 		errors.email = undefined;
	// 	}
	// }

	return (
		<Container className='login'>
			<h1>home</h1>
		</Container>
	);
}

export default Home;
