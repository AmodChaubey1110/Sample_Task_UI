import axios from 'axios';
import { BASEURL } from '../constants';
import Cookies from 'universal-cookie';

/**
 * Common API method
 * @param {string} method GET | POST | DELETE | PATCH
 * @param {string} baseURL http://api.example.com
 * @param {string} url /user/id
 * @param {object} params Query parameters
 * @param {object} headers API headers are appended to common headers
 * @param {object} body API body / Empty by default
 */

const AXIOSCALL = async (
	method,
	url,
	params = {},
	headers = {},
	body = {}
	// baseURL = BASEURL.
) => {
	try {
		const cookies = new Cookies();
		const loginData = cookies.get('loginData');
		const token = loginData?.token;
		//console.log('loginData', token);

		const commonHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
		};
		if (token) {
			commonHeaders.Authorization = `Bearer ${token}`;
		}
		//console.log('commonHeaders------------->>', commonHeaders);

		const response = await axios({
			method,
			url,
			params: { ...params },
			headers: { ...commonHeaders, ...headers },
			data: body,
		});
		//console.log('Response', response?.data?.data);

		return {
			status: response.status,
			message: response.data.message,
			data: response.data,
		};
	} catch (error) {
		return {
			data: error,
			err: error.response,
			message: error.response !== undefined ? error.response.statusText : '',
			status: error.response !== undefined ? error.response.status : 'failed',
		};
	}
};

export default AXIOSCALL;
