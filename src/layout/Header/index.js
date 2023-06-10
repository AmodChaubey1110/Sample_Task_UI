import React from 'react';
import Cookies from 'universal-cookie';
import { ROUTE_PATH } from '../../constants';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = () => {
	const cookies = new Cookies();
	const navigate = useNavigate();
	const loginData = cookies.get('loginData');
	const userName = loginData?.user?.name;
	const logout = () => {
		cookies.remove('loginData', { path: '/' });
		navigate(ROUTE_PATH.LOGIN);
	};
	return (
		<>
			<div id="header">
				<div className="mainContain">
					<div className="options">
						<div className="profileName">{userName}</div>
						<div
							className="logout"
							onClick={() => {
								logout();
							}}
						>
							logout
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
