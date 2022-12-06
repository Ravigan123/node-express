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

function ResetPassword() {
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const token = window.location.href.split("/")[4];
	const id = window.location.href.split("/")[5];

	async function ChangeInBase(user) {
		let err;
		try {
			await axios.put(
				`${process.env.REACT_APP_API_URL}/reset-password/${token}/${id}`,
				user
			);
		} catch (error) {
			if (error.response.data === undefined)
				err = "No connection to the server";
			else err = error.response.data.message;
		}
		return err;
	}

	const handlePassword = (event) => {
		setPassword(event.target.value);
	};
	const handlePassword2 = (event) => {
		setPassword2(event.target.value);
	};

	const validateForm = (backandValid) => {
		const newErrors = {};
		if (backandValid === "Hasło jest zbyt mało złożone")
			newErrors.password = backandValid;
		if (backandValid === "Hasła nie są identyczne")
			newErrors.password2 = backandValid;

		return newErrors;
	};

	async function changePassword(e) {
		e.preventDefault();

		const user = {
			password,
			password2,
		};
		const backandValid = await ChangeInBase(user);
		const formErrors = validateForm(backandValid);

		if (Object.keys(formErrors).length > 0) setErrors(formErrors);
		else navigate("/logowanie");
	}

	return (
		<Container className='login'>
			<Form onSubmit={changePassword} className='login__form'>
				<div className='login__top'>
					<h1 className='login__logo'>Nazwa</h1>
					<h2 className='login__header'>Resetuj hasło</h2>
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
				</div>
				<div className='login__inputs'>
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
				<div className='login__bnt'>
					<Button className=' bnt-action login__bnt-login' type='submit'>
						Resetuj
					</Button>
				</div>
			</Form>
		</Container>
	);
}

export default ResetPassword;
