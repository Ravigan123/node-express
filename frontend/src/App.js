import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";

function App() {
	return (
		<>
			<Router>
				<Routes>
					{/* <Route path='/' element={<Data />} /> */}
					<Route path='/logowanie' element={<LoginForm />} />
					<Route path='/rejestracja' element={<RegisterForm />} />
					<Route path='/zapomnialem-haslo' element={<ForgotPassword />} />
					<Route path='/resetuj-haslo/:token/:id' element={<ResetPassword />} />
					{/* <Route path='/location/create' element={<NewLocation />} />
					<Route path='/device' element={<Device />} />
					<Route path='/device/create' element={<NewDevice />} />
					<Route path='/type' element={<Type />} />
					<Route path='/receiver' element={<Receiver />} />
					<Route path='/receiver/create' element={<NewReceiver />} />
					<Route path='/alert' element={<Alert />} /> */}
				</Routes>
			</Router>
		</>
	);
}

export default App;
