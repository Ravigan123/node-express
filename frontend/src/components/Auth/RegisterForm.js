import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

function RegisterForm() {
	const [name, setName] = useState("");
	const [hash, setHash] = useState("");
	const [ip, setIp] = useState("");
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	async function addToBase(location) {
		let err;
		try {
			await axios.post(`${process.env.REACT_APP_API_URL}location`, location);
		} catch (error) {
			if (error.response.data === undefined)
				err = "No connection to the server";
			else err = error.response.data.message;
		}
		return err;
	}

	const handleName = (event) => {
		setName(event.target.value);
		if (!!errors[name])
			setErrors({
				...errors,
				[name]: null,
			});
	};
	const handleHash = (event) => {
		setHash(event.target.value);
	};
	const handleIp = (event) => {
		setIp(event.target.value);
	};

	const validateForm = (backandValid) => {
		const newErrors = {};
		if (backandValid === "No connection to the server")
			newErrors.server = backandValid;
		if (backandValid === "The given name already exists")
			newErrors.name = backandValid;
		if (backandValid === "The given hash already exists")
			newErrors.hash = backandValid;

		return newErrors;
	};

	async function addLocation(e) {
		e.preventDefault();

		const location = {
			name_location: name,
			hash_location: hash,
			ip_location: ip,
		};

		const backandValid = await addToBase(location);
		const formErrors = validateForm(backandValid);

		if (Object.keys(formErrors).length > 0) setErrors(formErrors);
		else navigate(-1);
	}

	return (
		<Container>
			<div className='login'>
				<Form onSubmit={addLocation} className='login__form'>
					<div className='login__top'>
						<img className='login__img' src='' alt='logo'></img>
						<h1 className='login__header'>Utwórz konto</h1>
					</div>
					<Form.Group controlId='validationCustomName'>
						<Form.Control
							size='lg'
							className='login__input'
							type='text'
							placeholder='Email'
							name='name'
							value={name}
							required
							isInvalid={!!errors.name}
							onChange={handleName}
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.name}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId='validationCustomHash'>
						<Form.Control
							size='lg'
							className='login__input'
							type='password'
							placeholder='Hasło'
							name='password'
							value={hash}
							required
							isInvalid={!!errors.hash}
							onChange={handleHash}
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.hash}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId='validationCustomHash'>
						<Form.Control
							size='lg'
							className='login__input'
							type='password'
							placeholder='Powtórz hasło'
							name='password2'
							value={hash}
							required
							isInvalid={!!errors.hash}
							onChange={handleHash}
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.hash}
						</Form.Control.Feedback>
					</Form.Group>

					<div className='login__bottom'>
						<a className='login__register' href='/logowanie'>
							Mam już konto
						</a>
					</div>
					<Button className='float-end bnt-action login__bnt' type='submit'>
						Zarejestruj się
					</Button>
				</Form>
			</div>
		</Container>
	);
}

export default RegisterForm;
