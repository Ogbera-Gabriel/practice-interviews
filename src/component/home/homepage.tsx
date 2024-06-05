import { Link } from 'react-router-dom';
import './homepage.css'; 

export default function HomePage() {
    return (
        <div>
            <nav className="navbar">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/characters" className="nav-link">Characters</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/planets" className="nav-link">Planets</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/game" className="nav-link">Game</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/jobs" className='nav-link'>Jobs</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/time" className='nav-link'>Clock</Link>
                    </li>
		     <li className='nav-item'>
                        <Link to="/test" className='nav-link'>Test</Link>
                    </li>
                </ul>
            </nav>
            <h1>Welcome to Star Wars Page</h1>
        </div>
    );
}
