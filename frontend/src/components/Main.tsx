import { Routes, Route } from 'react-router-dom';
import Cities from './Cities';
import NewCity from './NewCity';
import CityDetails from './CityDetails';

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
				<Route
					path='/cities/:id'
					element={<CityDetails />}
				/>
			</Routes>
		</main>
	);
};

export default Main;
