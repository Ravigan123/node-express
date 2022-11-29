import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [ip, setIp] = useState("");
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	async function loginInBase(user) {
		console.log(process.env.REACT_APP_API_URL);
		let err;
		try {
			await axios.post(`${process.env.REACT_APP_API_URL}login`, user);
		} catch (error) {
			if (error.response.data === undefined)
				err = "No connection to the server";
			else err = error.response.data.message;
		}
		// console.log(err);
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

		const user = {
			email,
			password,
		};

		const backandValid = await loginInBase(user);
		const formErrors = validateForm(backandValid);

		if (Object.keys(formErrors).length > 0) setErrors(formErrors);
		else navigate("home");
	}

	return (
		<Container>
			<div className='login'>
				<Form onSubmit={login} className='login__form'>
					<div className='login__top'>
						<img className='login__img' src='' alt='logo'></img>
						<h1 className='login__header'>Zaloguj się</h1>
					</div>
					<Form.Group controlId='validationCustomEmail' className='mb-4'>
						<Form.Control
							size='lg'
							className='login__input'
							type='text'
							placeholder='Email'
							name='email'
							value={email}
							required
							isInvalid={!!errors.email}
							onChange={handleEmail}
						/>
						<Form.Control.Feedback type='invalid' className='login__valid'>
							{errors.email}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId='validationCustomPassword' className='mb-4'>
						<Form.Control
							size='lg'
							className='login__input'
							type='password'
							placeholder='Hasło'
							name='password'
							value={password}
							required
							isInvalid={!!errors.password}
							onChange={handlePassword}
						/>
						<Form.Control.Feedback type='invalid' className='login__valid'>
							{errors.password}
						</Form.Control.Feedback>
					</Form.Group>

					<div className='login__bottom'>
						<a className='login__register' href='/rejestracja'>
							Nie mam konta
						</a>
						<a className='login__forgot float-end' href=''>
							Zapomniałem hasło
						</a>
					</div>
					<Button className='float-end bnt-action login__bnt' type='submit'>
						Zaloguj się
					</Button>
				</Form>

				{/* <Form onSubmit={login} className='mt-5'>
				{errors.location !== undefined && (
					<Alert variant='danger'>{errors.location}</Alert>
				)}

				<Form.Group controlId='validationCustomName'>
					<FloatingLabel controlId='floatingName' label='Name' className='mb-3'>
						<Form.Control
							className='inputs'
							type='text'
							placeholder='email'
							name='email'
							value={email}
							required
							isInvalid={!!errors.email}
							onChange={handleEmail}
						/>
						<Form.Control.Feedback type='invalid' className='cos'>
							{errors.email}
						</Form.Control.Feedback>
					</FloatingLabel>
				</Form.Group>

				<Form.Group controlId='validationCustomIp'>
					<FloatingLabel controlId='floatingIp' label='Ip' className='mb-3'>
						<Form.Control
							className='inputs'
							type='text'
							placeholder='password'
							name='password'
							value={password}
							required
							isInvalid={!!errors.password}
							onChange={handlePassword}
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.password}
						</Form.Control.Feedback>
					</FloatingLabel>
				</Form.Group>

				<Button className='float-end bnt-action' type='submit'>
					Add
				</Button>
			</Form> */}
			</div>
		</Container>
	);
}

export default LoginForm;
