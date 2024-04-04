import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CityDetails: React.FC<{
	show: boolean;
	onHide: () => void;
	city: string;
}> = ({ show, onHide, city }) => {
	return (
		<div>
			<Modal
				show={show}
				onHide={onHide}
			>
				<Modal.Header>
					<Modal.Title>{city.cityName}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{city.count}</Modal.Body>
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
