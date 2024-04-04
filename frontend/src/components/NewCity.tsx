import { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';

const NewCity: React.FC = () => {
	const [cityName, setCityName] = useState<string>('');
	const [count, setCount] = useState<number>(0);
	const navigate = useNavigate();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		axios
			.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/cities`, {
				cityName,
				count,
			})
			.then(() => navigate('/'))
			.catch(console.error);
	};

	return (
		<div className='main'>
			<Card className='p-3'>
				<Row>
					<Col
						md={16}
						className='mx-auto'
					>
						<h4 className='text-center fw-bold text-success mb-5'>
							Add A City
						</h4>
						<Form onSubmit={handleSubmit}>
							<Form.Group className='mb-3'>
								<Form.Label>City Name</Form.Label>
								<Form.Control
									type='text'
									value={cityName}
									placeholder='Enter city name'
									onChange={(e) => setCityName(e.target.value)}
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Count</Form.Label>
								<Form.Control
									type='number'
									value={count.toString()}
									placeholder='Enter count'
									onChange={(e) => setCount(parseInt(e.target.value, 10))}
								/>
							</Form.Group>
							<div className='d-grid gap-2'>
								<Button
									variant='primary'
									type='submit'
								>
									Add City
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</Card>
		</div>
	);
};

export default NewCity;
