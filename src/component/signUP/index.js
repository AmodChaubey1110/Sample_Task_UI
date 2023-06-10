import React from 'react';
import { Formik } from 'formik';
import './signUp.scss';
import { BASEURL, URLENDPOINT, ROUTE_PATH } from '../../constants';
import axios from '../../config/api';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
	const cookies = new Cookies();
	const navigate = useNavigate();

	const SignUp = async (reqBody) => {
		const response = axios(
			'POST',
			BASEURL.url + URLENDPOINT.signUp,
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
		<div id="signUp">
			<div className="mainConatiner">
				<div className="loginSub">
					<div>
						<h1 className="centerText">SignUp</h1>
						<Formik
							initialValues={{ name: '', email: '', password: '', age: '' }}
							validate={(values) => {
								const errors = {};
								if (!values.name) {
									errors.name = 'Required';
								}
								if (!values.email) {
									errors.email = 'Required';
								} else if (
									!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
								) {
									errors.email = 'Invalid email address';
								}

								if (!values.password) {
									errors.password = 'Required';
								}
								return errors;
							}}
							onSubmit={(values, { setSubmitting }) => {
								//console.log(values);
								SignUp(values);
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
										type="text"
										name="name"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.name}
										placeholder="Name"
									/>
									{errors.name && touched.name && errors.name}
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
									<input
										className="inputField"
										type="number"
										name="age"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.age}
										placeholder="Age"
									/>
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
							navigate(ROUTE_PATH.LOGIN);
						}}
					>
						Login
					</h4>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
