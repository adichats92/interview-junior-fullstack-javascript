import { Container, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
	return (
		<header>
			<Navbar className='bg-body-tertiary'>
				<Container>
					<NavLink to='/'>Home</NavLink>

					<NavLink to='/cities/new'>Add City</NavLink>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
