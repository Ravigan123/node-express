import React, { useState, useEffect, useContext } from "react";
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
import AuthContext from "./Auth/AuthContext";
import NavScrollExample from "./Nav";
import MonthTransaction from "./MonthTransaction";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer class='bg-dark text-light py-4 text-center'>
			<p class='mb-0'>&copy; {year} | Nazwa strony</p>
		</footer>
	);
}

export default Footer;
