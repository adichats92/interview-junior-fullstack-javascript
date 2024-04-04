import { Routes, Route } from 'react-router-dom';
import Cities from './Cities';
import NewCity from './NewCity';
import CityDetails from './CityDetails';
import UpdateCity from './UpdateCity';

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
				<Route
					path='/cities/:id/update'
					element={<UpdateCity />}
				/>
			</Routes>
		</main>
	);
};

export default Main;
