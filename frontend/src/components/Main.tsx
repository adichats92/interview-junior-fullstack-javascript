import { Routes, Route } from 'react-router-dom';
import Cities from './Cities';
import NewCity from './NewCity';

const Main: React.FC = () => {
	return (
		<main className='container'>
			<Routes>
				<Route
					path='/'
					element={<Cities />}
				/>
				<Route
					path='/cities/new'
					element={<NewCity />}
				/>
			</Routes>
		</main>
	);
};

export default Main;
