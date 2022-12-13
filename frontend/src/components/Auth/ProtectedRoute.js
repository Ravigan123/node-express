import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const ProtectedRoute = ({ children, accessBy }) => {
	const { user } = useContext(AuthContext);
	if (accessBy === "no-auth") {
		if (!user) {
			return children;
		} else return <Navigate to='/'></Navigate>;
	} else if (accessBy === "auth") {
		if (user) {
			return children;
		} else return <Navigate to='/logowanie'></Navigate>;
	}
};
export default ProtectedRoute;
