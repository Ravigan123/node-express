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
			<div className='month__name'>grudzień</div>
			<div className='month__name float-end'>
				<button>Add </button>
			</div>
			<div class='row'>
				<div className='month__income col col-lg-6'>
					<h2 className='month__type'>przychody</h2>
					<div className='month__list'>
						<ul>
							{tab.map((tran, index) => {
								return (
									<li ley={index} className='month__item'>
										{tran.date + " " + tran.name + " " + tran.price + "zł"}
									</li>
								);
							})}
						</ul>
					</div>
					<p className='month__sum'>Suma: 2300</p>
				</div>
				<div class='month__expense col col-lg-6'>
					<h2 className='month__type'>wydatki</h2>
					<div className='month__list'>
						<ul>
							{tab.map((tran, index) => {
								return (
									<li ley={index} className='month__item'>
										{tran.date + " " + tran.name + " " + tran.price + "zł"}
									</li>
								);
							})}
						</ul>
					</div>
					<p className='month__sum'>Suma: 2300</p>
				</div>
			</div>

			<p className='month__summary'>Bilans</p>
		</div>
	);
}

export default MonthTransaction;
