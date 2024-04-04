import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface City {
	cityName: string;
	count: number;
}

interface CityDetailsProps {
	show: boolean;
	onHide: () => void;
	city: City;
}

const CityDetails: React.FC<CityDetailsProps> = ({ show, onHide, city }) => {
	return (
		<div>
			<Modal
				show={show}
				onHide={onHide}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>{city.cityName}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{`Count: ${city.count}`}</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={onHide}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default CityDetails;
