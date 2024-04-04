import { useEffect, useState } from 'react';
import axios from 'axios';
import CityDetails from './CityDetails';
import {
	Button,
	ButtonGroup,
	Card,
	CardBody,
	Col,
	Form,
	Row,
} from 'react-bootstrap';

const Cities: React.FC = () => {
	const [cities, setCities] = useState([]);
	const [selectedCity, setSelectedCity] = useState('');
	const [showModal, setShowModal] = useState(false);
	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/cities`)
			.then((res) => setCities(res.data))
			.catch((e) => console.error(e));
	}, []);
	const handleShowModal = (city: string) => {
		setSelectedCity(city);
		setShowModal(true);
	};

	return (
		<div className='main'>
			<h1 className='my-2'>Find your City</h1>
			<Form className='my-2'>
				<Row>
					<Form.Control
						type='text'
						placeholder='Search'
						value={cityName}
					/>
				</Row>
			</Form>
			<div className='name-list'>
				{cities.map((city) => (
					<div key={city._id}>
						<Card>
							<CardBody>
								<h2 style={{ marginBottom: '2rem' }}>{city.cityName}</h2>
								<ButtonGroup>
									<Button
										variant='info'
										onClick={() => handleShowModal(city)}
									>
										See Details
									</Button>
									<Button variant='success'>Edit</Button>
									<Button variant='danger'>Delete</Button>
								</ButtonGroup>
							</CardBody>
						</Card>
					</div>
				))}
			</div>
			{selectedCity && (
				<CityDetails
					show={showModal}
					onHide={() => setShowModal(false)}
					city={selectedCity}
				/>
			)}
		</div>
	);
};

export default Cities;
