import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewCity: React.FC = () => {
	const [cityName, setCityName] = useState('');
	const [count, setCount] = useState(0);
	const navigate = useNavigate();
	const handleSubmit = (e: { preventDefault: () => void }) => {
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
		<div>
			<h2>Add New City</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor=''>Name</label>
					<input
						type='text'
						value={cityName}
						placeholder='enter city name'
						onChange={(e) => setCityName(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor=''>Count</label>
					<input
						type='number'
						value={count}
						placeholder='enter count'
						onChange={(e) => setCount(parseInt(e.target.value, 10))}
					/>
				</div>
				<button>Add City</button>
			</form>
		</div>
	);
};

export default NewCity;
