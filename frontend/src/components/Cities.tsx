import { useEffect, useState } from 'react';
import axios from 'axios';
import CityDetails from './CityDetails';
import {
	Button,
	ButtonGroup,
	Card,
	CardBody,
	Form,
	Row,
	Pagination,
	Modal,
} from 'react-bootstrap';

interface City {
	_id: string;
	cityName: string;
	count: number;
}

const Cities: React.FC = () => {
	const [cities, setCities] = useState<City[]>([]);
	const [selectedCity, setSelectedCity] = useState<City | null>(null);
	const [searchInput, setSearchInput] = useState<string>('');
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [citiesPerPage] = useState<number>(5);
	const [filteredCities, setFilteredCities] = useState<City[]>([]);
	const [updatedCityName, setUpdatedCityName] = useState<string>('');
	const [updatedCount, setUpdatedCount] = useState<string>('');

	// to fetch all data from backend
	// useEffect(() => {
	// 	axios
	// 		.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/cities`)
	// 		.then((res) => {
	// 			const sortedCities = res.data.sort((a: City, b: City) =>
	// 				a.cityName.localeCompare(b.cityName)
	// 			);
	// 			setCities(sortedCities);
	// 		})
	// 		.catch((e) => console.error(e));
	// }, []);

	// to handle the details modal through cityDetails component
	const handleShowModal = (city: any) => {
		setSelectedCity(city);
		setShowModal(true);
	};
	const handleShowEditModal = (city: City) => {
		setSelectedCity(city);
		setUpdatedCityName(city.cityName);
		setUpdatedCount(city.count.toString());
		setShowEditModal(true);
	};
	// to delete a city from database
	const handleDeleteCity = async (cityId: string) => {
		// the confirmation dialog
		const isConfirmed = window.confirm(
			'Are you sure you want to delete this city?'
		);
		if (isConfirmed) {
			try {
				await axios.delete(
					`${import.meta.env.VITE_SERVER_BASE_URL}/api/cities/${cityId}`
				);
				setCities(cities.filter((city) => city._id !== cityId));
				setFilteredCities(filteredCities.filter((city) => city._id !== cityId));
			} catch (error) {
				console.error(error);
			}
		}
	};
	// to update a city
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!selectedCity) return;
		try {
			const { data: updatedCity } = await axios.put(
				`${import.meta.env.VITE_SERVER_BASE_URL}/api/cities/${
					selectedCity._id
				}`,
				{
					cityName: updatedCityName,
					count: parseInt(updatedCount, 10),
				}
			);

			const updatedCities = cities.map((city) =>
				city._id === updatedCity._id ? updatedCity : city
			);
			setCities(updatedCities);
			setFilteredCities(updatedCities);
			setShowEditModal(false);
		} catch (error) {
			console.error(error);
		}
	};

	// to filter cities through backend
	useEffect(() => {
		const handler = setTimeout(() => {
			if (searchInput.trim()) {
				axios
					.get(
						`${
							import.meta.env.VITE_SERVER_BASE_URL
						}/api/cities/name/${searchInput}`
					)
					.then((response) => {
						setFilteredCities(response.data);
					})
					.catch(console.error);
			} else {
				// to fetch all cities if search input is empty
				axios
					.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/cities`)
					.then((response) => {
						const sortedCities = response.data.sort((a: City, b: City) =>
							a.cityName.localeCompare(b.cityName)
						);
						setCities(sortedCities);
					})
					.catch(console.error);
			}
		}, 50);

		return () => clearTimeout(handler);
	}, [searchInput]);

	// to filter cities by letter through search bar on frontend
	// const filteredCities = cities.filter((city) =>
	// 	city.cityName.toLowerCase().includes(searchInput.toLowerCase())
	// );

	const cityForPages = searchInput.trim()
		? filteredCities.length
		: cities.length;

	const totalPages = Math.ceil(cityForPages / citiesPerPage);

	// to change page
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const indexOfLastCity = currentPage * citiesPerPage;
	const indexOfFirstCity = indexOfLastCity - citiesPerPage;
	const currentCities = searchInput.trim()
		? filteredCities.slice(indexOfFirstCity, indexOfLastCity)
		: cities.slice(indexOfFirstCity, indexOfLastCity);

	// to calculate the range of pagination numbers to display
	let maxPageNumberLimit = Math.min(totalPages, 6);
	let minPageNumberLimit = 0;
	if (currentPage > 3) {
		maxPageNumberLimit = Math.min(currentPage + 2, totalPages);
		minPageNumberLimit = Math.max(currentPage - 3, 0);
	}

	return (
		<div className='main'>
			<Form className='my-3'>
				<Row>
					<Form.Control
						type='text'
						placeholder='Search'
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
					/>
				</Row>
			</Form>
			<div className='name-list d-flex justify-content-center justify-content-lg-between flex-wrap gap-4 mt-5 mb-6'>
				{filteredCities.length > 0 ? (
					currentCities.map((city) => (
						<div key={city._id}>
							<Card className=''>
								<CardBody>
									<h5 className='mb-4'>{city.cityName}</h5>
									<ButtonGroup className=''>
										<Button
											variant='info'
											onClick={() => handleShowModal(city)}
										>
											Details
										</Button>
										<Button
											variant='success'
											onClick={() => handleShowEditModal(city)}
										>
											Edit
										</Button>
										<Button
											variant='danger'
											onClick={() => handleDeleteCity(city._id)}
										>
											Delete
										</Button>
									</ButtonGroup>
								</CardBody>
							</Card>
						</div>
					))
				) : (
					<>
						{currentCities.map((city) => (
							<div key={city._id}>
								<Card>
									<CardBody>
										<h5 className='mb-4'>{city.cityName}</h5>
										<ButtonGroup>
											<Button
												variant='info'
												onClick={() => handleShowModal(city)}
											>
												Details
											</Button>
											<Button
												variant='success'
												onClick={() => handleShowEditModal(city)}
											>
												Edit
											</Button>
											<Button
												variant='danger'
												onClick={() => handleDeleteCity(city._id)}
											>
												Delete
											</Button>
										</ButtonGroup>
									</CardBody>
								</Card>
							</div>
						))}
					</>
				)}
			</div>
			<Pagination>
				<Pagination.First onClick={() => paginate(1)} />
				<Pagination.Prev
					onClick={() => paginate(Math.max(1, currentPage - 1))}
				/>
				{Array.from({ length: totalPages }, (_, index) => index + 1)
					.filter(
						(number) =>
							number < maxPageNumberLimit + 1 && number > minPageNumberLimit
					)
					.map((number) => (
						<Pagination.Item
							key={number}
							active={number === currentPage}
							onClick={() => paginate(number)}
						>
							{number}
						</Pagination.Item>
					))}
				<Pagination.Next
					onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
				/>
				<Pagination.Last onClick={() => paginate(totalPages)} />
			</Pagination>

			{selectedCity && (
				<CityDetails
					show={showModal}
					onHide={() => setShowModal(false)}
					city={selectedCity}
				/>
			)}

			{selectedCity && (
				<Modal
					show={showEditModal}
					onHide={() => setShowEditModal(false)}
					centered
				>
					<Form onSubmit={handleSubmit}>
						<Modal.Header closeButton>
							<Modal.Title>Edit City</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form.Group className='mb-3'>
								<Form.Label>City Name</Form.Label>
								<Form.Control
									type='text'
									value={updatedCityName}
									onChange={(e) => setUpdatedCityName(e.target.value)}
									required
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Count</Form.Label>
								<Form.Control
									type='number'
									value={updatedCount}
									onChange={(e) => setUpdatedCount(e.target.value)}
									required
								/>
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant='secondary'
								onClick={() => setShowEditModal(false)}
							>
								Close
							</Button>
							<Button
								variant='primary'
								type='submit'
							>
								Save Changes
							</Button>
						</Modal.Footer>
					</Form>
				</Modal>
			)}
		</div>
	);
};

export default Cities;
