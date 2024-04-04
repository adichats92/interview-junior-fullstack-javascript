import { Container, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
	return (
		<header>
			<Navbar className='bg-success py-3'>
				<Container>
					<NavLink
						className='text-decoration-none text-white fw-bold'
						to='/'
					>
						Home
					</NavLink>
					<h1 className='ms-1 my-1 text-light text-center '>Find your City</h1>
					<NavLink
						className='text-decoration-none text-white fw-bold'
						to='/cities/new'
					>
						Add City
					</NavLink>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
