import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoutes = () => {
	const token = Cookies.get("JWT");
	console.log(token);
	let auth = { token: false };
	return auth.token ? <Outlet /> : <Navigate to='/logowanie' />;
};

export default PrivateRoutes;
