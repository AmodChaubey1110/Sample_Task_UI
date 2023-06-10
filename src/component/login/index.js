import React from 'react';
import { Formik } from 'formik';
import './login.scss';
import { BASEURL, URLENDPOINT, ROUTE_PATH } from '../../constants';
import axios from '../../config/api';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const cookies = new Cookies();
	const navigate = useNavigate();

	const login = async (reqBody) => {
		const response = axios(
			'POST',
			BASEURL.url + URLENDPOINT.login,
			{},
			{},
			reqBody
		)
			.then((res) => {
				//console.log('res', res);
				cookies.set('loginData', res?.data, { path: '/' });
				navigate(ROUTE_PATH.DASHBOARD);
			})
			.catch((err) => {
				//console.log('err', err);
			});
	};
	return (
		<div id="login">
			<div className="mainConatiner">
				<div className="loginSub">
					<div>
						<h1 className="centerText">LOGIN</h1>
						<Formik
							initialValues={{ email: '', password: '' }}
							validate={(values) => {
								const errors = {};
								if (!values.email) {
									errors.email = 'Required';
								} else if (
									!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
								) {
									errors.email = 'Invalid email address';
								}
								return errors;
							}}
							onSubmit={(values, { setSubmitting }) => {
								//console.log(values);
								login(values);
							}}
						>
							{({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit,
								isSubmitting,
								/* and other goodies */
							}) => (
								<form className="alignInput" onSubmit={handleSubmit}>
									<input
										className="inputField"
										type="email"
										name="email"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
										placeholder="Email ID"
									/>
									{errors.email && touched.email && errors.email}
									<input
										className="inputField"
										type="password"
										name="password"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.password}
										placeholder="Password"
									/>
									{errors.password && touched.password && errors.password}

									{errors.age && touched.age && errors.age}
									<button
										className="inputField submitButton"
										type="submit"
										disabled={isSubmitting}
									>
										Submit
									</button>
								</form>
							)}
						</Formik>
					</div>
					<h4
						className="submitButton"
						onClick={() => {
							navigate(ROUTE_PATH.SIGNUP);
						}}
					>
						Sign Up
					</h4>
				</div>
			</div>
		</div>
	);
};

export default Login;
