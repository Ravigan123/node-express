import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function MonthTransaction() {
	const tab = [
		{ date: "15.12.2022", name: "nazwa", price: "10" },
		{ date: "15.12.2022", name: "nazwa", price: "10" },
		{ date: "15.12.2022", name: "nazwa", price: "10" },
		{ date: "15.12.2022", name: "nazwa", price: "10" },
		{ date: "15.12.2022", name: "nazwa", price: "10" },
		{ date: "15.12.2022", name: "nazwa", price: "10" },
		{ date: "15.12.2022", name: "nazwa", price: "10" },
		{ date: "15.12.2022", name: "nazwa", price: "10" },
		{ date: "15.12.2022", name: "nazwa", price: "10" },
		{ date: "15.12.2022", name: "nazwa", price: "10" },
	];

	return (
		<div className='month'>
			<div className='month__name'></div>
			<div className='month__list'>
				<ul>
					{tab.map((tran, index) => {
						return (
							<li ley={index}>
								{tran.date + " " + tran.name + " " + tran.price + "zł"}
							</li>
						);
					})}
				</ul>
			</div>
			<div className='month__more'>
				<a href='/grudzien/'>Pokaż więcej </a>
			</div>
		</div>
	);
}

export default MonthTransaction;
