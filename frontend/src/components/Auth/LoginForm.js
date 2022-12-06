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

function LoginForm() {
	const navigate = useNavigate();
	const location = useLocation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [activeInfo, setActiveInfo] = useState(location.state ? true : false);
	const [ip, setIp] = useState("");
	const [errors, setErrors] = useState({});

	useEffect(() => {
		isLogged();
	}, []);

	async function isLogged() {
		let err;
		try {
			await axios
				.get(`${process.env.REACT_APP_API_URL}isLogged`)
				.then((res) => {
					console.log(res.data);
				});
		} catch (error) {
			if (error.response.data === undefined)
				err = "No connection to the server";
			else err = error.response.data.message;
		}
		return err;
	}

	async function loginInBase(user) {
		let err;
		try {
			await axios.post(`${process.env.REACT_APP_API_URL}login`, user);
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
	const handlePassword = (event) => {
		setPassword(event.target.value);
	};

	const validateForm = (backandValid) => {
		const newErrors = {};
		if (backandValid === "Błędny adres email") newErrors.email = backandValid;
		if (backandValid === "Błędne hasło") newErrors.password = backandValid;
		if (backandValid === "Konto nie aktywne") newErrors.active = backandValid;

		return newErrors;
	};

	async function login(e) {
		e.preventDefault();
		setActiveInfo(false);
		setPassword("");
		const user = {
			email,
			password,
		};
		console.log(user);
		const backandValid = await loginInBase(user);
		const formErrors = validateForm(backandValid);

		if (Object.keys(formErrors).length > 0) setErrors(formErrors);
		else navigate("/");
	}

	return (
		<Container className='login'>
			<Form onSubmit={login} className='login__form'>
				<div className='login__top'>
					<h1 className='login__logo'>Nazwa</h1>
					<h2 className='login__header'>Zaloguj się</h2>
					{activeInfo && (
						<Alert className='login__alert' variant='success'>
							Konto zostało utworzone. Sprawdź pocztę, aby aktywować.
						</Alert>
					)}
					{errors.email !== undefined && (
						<Alert className='login__alert' variant='danger'>
							{errors.email}
						</Alert>
					)}
					{errors.password !== undefined && (
						<Alert className='login__alert' variant='danger'>
							{errors.password}
						</Alert>
					)}
					{errors.active !== undefined && (
						<Alert className='login__alert' variant='danger'>
							{errors.active}
						</Alert>
					)}
				</div>
				<div className='login__inputs'>
					<MDBInput
						className='login__input'
						label='Email input'
						id='typeEmail'
						type='email'
						name='email'
						value={email}
						required
						onChange={handleEmail}
					/>
					<MDBInput
						className='login__input'
						label='Password input'
						id='typePassword'
						type='password'
						name='password'
						value={password}
						required
						onChange={handlePassword}
					/>
				</div>
				<div className='login__bottom'>
					<a className='login__register' href='/rejestracja'>
						Nie mam konta
					</a>
					<a className='login__register float-end' href='/zapomnialem-haslo'>
						Zapomniałem hasło
					</a>
				</div>
				<div className='login__bnt'>
					<Button className=' bnt-action login__bnt-login' type='submit'>
						Zaloguj
					</Button>
				</div>
			</Form>
		</Container>
	);
}

export default LoginForm;
