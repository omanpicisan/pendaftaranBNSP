import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {
    FaHome, FaUserPlus, FaListAlt, FaSignOutAlt, FaUsers
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/dashboard');
    };

    return (
        <div className="sidebar">
            <h3>Dashboard Pendaftaran Siswa</h3>
            <ul>
                <li>
                    <NavLink to={'/dashboard'} className={({ isActive }) => isActive ? 'active' : ''}>
                        <FaHome className="icon" /> Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/dashboard/pendaftaran'} className={({ isActive }) => isActive ? 'active' : ''}>
                        <FaUserPlus className="icon" /> Registrasi
                    </NavLink>
                </li>
            </ul>

            <Button onClick={handleLogout} className="logout-button">
                <FaSignOutAlt className="icon" /> Logout
            </Button>
        </div>
    );
};

export default Sidebar;
