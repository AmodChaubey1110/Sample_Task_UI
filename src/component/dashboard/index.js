import React, { useState, useEffect, ChangeEvent } from 'react';
import CsvDownloader from 'react-csv-downloader';
import './dashboard.scss';
import AXIOSCALL from '../../config/api';
import { BASEURL, URLENDPOINT, columns } from '../../constants';

const Dashboard = () => {
	const [search, setSearch] = useState('');
	const [tableData, setTableData] = useState([]);
	const [file, setFile] = useState();
	const [searchedVal, setSearchedVal] = useState('');

	const handleSearch = (event) => {
		setSearch(event.target.value);
		//console.log('search', search);
		tableData.filter(() => {});
	};

	const selected = [];

	const selectedValues = (e, val) => {
		//console.log(e.target.checked);
		if (e.target.checked) {
			selected.push(val);
		} else {
			var index = selected.indexOf(val);
			if (index > -1) {
				selected.splice(index, 1);
			}
		}
		//console.log(selected);
	};

	const list = () => {
		const api = AXIOSCALL('GET', BASEURL.url + URLENDPOINT.getList)
			.then((res) => {
				setTableData(res?.data);
				//console.log('########', res?.data);
			})
			.catch((err) => {
				//console.log('errrrr', err);
			});
	};

	function handleChange(event) {
		setFile(event.target.files[0]);
	}

	function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData();
		formData.append('file', file);
		formData.append('fileName', file?.name);

		const headers = {
			'content-type': 'multipart/form-data',
		};

		const api = AXIOSCALL(
			'POST',
			BASEURL.url + URLENDPOINT.uploadFile,
			{},
			headers,
			formData
		)
			.then((res) => {})
			.catch((err) => {
				//console.log('errrrr', err);
			});
	}

	useEffect(() => {
		list();
	}, []);

	return (
		<div id="dashboard">
			<div className="buttonSet">
				<CsvDownloader
					filename={'Task List'}
					extension=".csv"
					enclosingCharacter={``}
					separator=","
					columns={columns}
					datas={selected}
				>
					{' '}
					<button className="downloadButton">Export</button>
				</CsvDownloader>
				<div className="upload">
					<form onSubmit={handleSubmit}>
						<input type="file" onChange={handleChange} />
						<button type="submit" className="uplaodButton">
							Upload
						</button>
					</form>
				</div>
			</div>
			<label htmlFor="search">
				Search by Company Name:
				<input onChange={(e) => setSearchedVal(e.target.value)} />
			</label>
			<table>
				<tr className="head">
					<th scope="col">Select</th>
					<th scope="col">Plan Type</th>
					<th>Company Name</th>
					<th>Emp Mobile No</th>
					<th>Emp Code</th>
					<th>Work Email</th>
					<th>Grade Card</th>
					<th>Emp Type</th>
					<th>Emp Name</th>
					<th>Designation</th>
					<th>Work Loaction</th>
					<th>DOJ</th>
				</tr>
				{tableData
					.filter(
						(row) =>
							!searchedVal.length ||
							row.Company_Name.toString()
								.toLowerCase()
								.includes(searchedVal.toString().toLowerCase())
					)
					.map((val, key) => {
						return (
							<>
								<tr key={key}>
									<input
										type="checkbox"
										onChange={(e) => {
											selectedValues(e, val);
										}}
									/>
									<td>{val.Plan_Type}</td>
									<td>{val.Company_Name}</td>
									<td>{val.Emp_Mobile_No}</td>
									<td>{val.Emp_Code}</td>
									<td>{val.Work_Email}</td>
									<td>{val.Grade_Card}</td>
									<td>{val.Emp_Type}</td>
									<td>{val.Emp_Name}</td>
									<td>{val.Designation}</td>
									<td>{val.Work_Loaction}</td>
									<td>{val.DOJ}</td>
								</tr>
							</>
						);
					})}
			</table>
		</div>
	);
};

export default Dashboard;
