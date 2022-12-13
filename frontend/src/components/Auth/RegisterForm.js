import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { MDBInput } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function RegisterForm({ isLogin, setIsLogin }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	async function RegisterInBase(user) {
		let err;
		try {
			await axios.post(`${process.env.REACT_APP_API_URL}register`, user);
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
	const handlePassword2 = (event) => {
		setPassword2(event.target.value);
	};

	const validateForm = (backandValid) => {
		const newErrors = {};
		if (backandValid === "Błędny adres email") newErrors.email = backandValid;
		if (backandValid === "Hasło jest zbyt mało złożone")
			newErrors.password = backandValid;
		if (backandValid === "Hasła nie są identyczne")
			newErrors.password2 = backandValid;
		if (backandValid === "Użytkownik o podanym adresie e-mail juz istnieje")
			newErrors.isEmail = backandValid;

		return newErrors;
	};

	async function register(e) {
		e.preventDefault();

		const user = {
			email,
			password,
			password2,
		};
		console.log(user);
		const backandValid = await RegisterInBase(user);
		const formErrors = validateForm(backandValid);

		if (Object.keys(formErrors).length > 0) setErrors(formErrors);
		else navigate("/logowanie", { state: { active: true } });
	}

	return (
		<Container className='login'>
			<Form onSubmit={register} className='login__form'>
				<div className='login__top'>
					<h1 className='login__logo'>Nazwa</h1>
					<h2 className='login__header'>Utwórz konto</h2>
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
					{errors.password2 !== undefined && (
						<Alert className='login__alert' variant='danger'>
							{errors.password2}
						</Alert>
					)}
					{errors.isEmail !== undefined && (
						<Alert className='login__alert' variant='danger'>
							{errors.isEmail}
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
						required
						onChange={handleEmail}
					/>
					<MDBInput
						className='login__input'
						label='Hasło'
						id='typePassword'
						type='password'
						name='password'
						required
						onChange={handlePassword}
					/>
					<MDBInput
						className='login__input'
						label='Powtórz hasło'
						id='typePassword2'
						type='password'
						name='password2'
						required
						onChange={handlePassword2}
					/>
				</div>
				<div className='login__bottom'>
					<a className='login__register' href='/logowanie'>
						mam już konto
					</a>
				</div>
				<div className='login__bnt'>
					<Button className=' bnt-action login__bnt-login' type='submit'>
						Zarejestruj
					</Button>
				</div>
			</Form>
		</Container>
	);
}

export default RegisterForm;
