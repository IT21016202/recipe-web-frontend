import React from 'react'
import Logo from '../images/recipe_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const NavBar = () => {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: 'Logout',
            html: 'Are you sure you want to logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                navigate('/');
            }
        });      
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <img src={Logo} alt='logo' className='nav-logo'/>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="d-flex justify-content-center w-100">  
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/home' className="nav-link"><b>HOME</b></Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/favourite' className="nav-link"><b>FAVOURITE</b></Link>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex">
                        <button className='btn-signout' onClick={() => handleLogout()}>
                            <FontAwesomeIcon icon={faSignOut}/>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar