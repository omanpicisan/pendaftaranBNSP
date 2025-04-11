import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {
    FaHome, FaUserPlus, FaSignOutAlt, FaBars, FaTimes
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        navigate('/dashboard');
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Hamburger button */}
            <div className="hamburger-menu" onClick={toggleSidebar}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <h3>Dashboard Pendaftaran Siswa</h3>
                <ul>
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeSidebar}>
                            <FaHome className="icon" /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/pendaftaran" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeSidebar}>
                            <FaUserPlus className="icon" /> Registrasi
                        </NavLink>
                    </li>
                </ul>

                <Button onClick={() => { handleLogout(); closeSidebar(); }} className="logout-button">
                    <FaSignOutAlt className="icon" /> Logout
                </Button>
            </div>
        </>
    );
};

export default Sidebar;
