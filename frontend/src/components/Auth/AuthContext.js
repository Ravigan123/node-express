import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		let id_user = localStorage.getItem("id_user");
		if (id_user) {
			return id_user;
		}
		return null;
	});
	const navigate = useNavigate();
	const login1 = async (user) => {
		await axios
			.post(`${process.env.REACT_APP_API_URL}login`, user)
			.then((res) => {
				console.log(res);
				localStorage.setItem("id_user", res.data.id);
				setUser(res.data.id);
				navigate("/");
			});
	};

	const logout = async () => {
		await axios.get(`${process.env.REACT_APP_API_URL}logout`, {
			withCredentials: true,
		});
		localStorage.removeItem("id_user");
		setUser(null);
		navigate("/logowanie");
	};

	return (
		<>
			<AuthContext.Provider value={{ user, login1, logout }}>
				{children}
			</AuthContext.Provider>
		</>
	);
};

export default AuthContext;
