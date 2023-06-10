import { BrowserRouter } from 'react-router-dom';
import Layout from './layout';
import Paths from './router';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Paths />
			</Layout>
		</BrowserRouter>
	);
}

export default App;
