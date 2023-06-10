import React from 'react';
import { Navigate, useOutlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

const ProtectedRoute = () => {
	const cookies = new Cookies();
	const loginData = cookies.get('loginData');
	const token = loginData?.token;
	const outlet = useOutlet();

	return <>{token ? [outlet] : <Navigate to="/" />}</>;
};

export default ProtectedRoute;
