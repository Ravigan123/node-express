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

function ForgotPassword() {
	const navigate = useNavigate();
	const location = useLocation();
	const [email, setEmail] = useState("");
	const [sendInfo, setSendInfo] = useState(false);
	const [ip, setIp] = useState("");
	const [errors, setErrors] = useState({});

	async function ForgotBase(user) {
		let err;
		try {
			await axios.post(`${process.env.REACT_APP_API_URL}forgot-password`, user);
		} catch (error) {
			if (error.response.data === undefined)
				err = "No connection to the server";
			else err = error.response.data.message;
		}
		return err;
	}

	const handleEmail = (event) => {
		setEmail(event.target.value);
		if (!!errors[email])
			setErrors({
				...errors,
				[email]: null,
			});
	};

	const validateForm = (backandValid) => {
		const newErrors = {};
		if (backandValid === "Brak użytkownika o podanym adresie email")
			newErrors.email = backandValid;

		return newErrors;
	};

	async function forgotSend(e) {
		setSendInfo(false);
		e.preventDefault();

		const user = {
			email,
		};
		const backandValid = await ForgotBase(user);
		const formErrors = validateForm(backandValid);

		if (Object.keys(formErrors).length > 0) setErrors(formErrors);
		else {
			setSendInfo(true);
			setEmail("");
			errors.email = undefined;
		}
	}

	return (
		<Container className='login'>
			<Form onSubmit={forgotSend} className='login__form'>
				<div className='login__top'>
					<h1 className='login__logo'>Nazwa</h1>
					<h2 className='login__header'>Zapomniałem hasło</h2>
					{sendInfo && (
						<Alert className='login__alert' variant='success'>
							Sprawdź pocztę, aby zresetować hasło
						</Alert>
					)}
					{errors.email !== undefined && (
						<Alert className='login__alert' variant='danger'>
							{errors.email}
						</Alert>
					)}
				</div>
				<div className='login__inputs'>
					<MDBInput
						className='login__input'
						label='Email'
						id='typeEmail'
						type='email'
						name='email'
						value={email}
						required
						onChange={handleEmail}
					/>
				</div>
				<div className='login__bottom'>
					<a className='login__register' href='/logowanie'>
						logowanie
					</a>
				</div>
				<div className='login__bnt'>
					<Button className=' bnt-action login__bnt-login' type='submit'>
						Wyślij
					</Button>
				</div>
			</Form>
		</Container>
	);
}

export default ForgotPassword;
