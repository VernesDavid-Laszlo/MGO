import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import user from './ProfileIcons/user.png';
import edit from './ProfileIcons/edit.png';
import admin from './ProfileIcons/admin.png';
import logout from './ProfileIcons/logout.png';
import './ProfileDropdownMenu.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function ProfileDropdownMenu({ onLogout }) {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const menuRef = useRef();
    const history = useHistory();
    const userIds = ["jmA281aSglaot4queXMoMTk3SeC2"];
    const currentUserId = firebase.auth().currentUser.uid;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = firebase.auth().currentUser;

                if (currentUser) {
                    const userDoc = await firebase.firestore().collection('users').doc(currentUser.uid).get();

                    if (userDoc.exists) {
                        setUsername(userDoc.data().userName);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        try {
            await firebase.auth().signOut();

            onLogout();

            history.push('/login');
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    const handleMyProfile = () => {
        history.push('/myprofile');
    };
    const handleEditProfile = () => {
        history.push('/edit');
    };
    const handleAdmin = () => {
        history.push('/admin');
    }

    return (
        <div className="App">
            <div className='menu-container' ref={menuRef}>
                <div className='menu-trigger' onClick={() => setOpen(!open)}>
                    <img src={user} alt="User Icon" />
                </div>

                <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
                    {username && (
                        <h3>
                            <span>{username}</span>
                        </h3>
                    )}
                    <ul>
                        <DropdownItem img={user} text="My Profile" onClick={handleMyProfile} />
                        <DropdownItem img={edit} text="Edit Profile" onClick={handleEditProfile}/>
                        <DropdownItem img={logout} text="Logout" onClick={handleLogout} />
                        {userIds.includes(currentUserId) && (
                            <DropdownItem img={admin} text="Admin" onClick={handleAdmin} />
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function DropdownItem(props) {
    return (
        <li className='dropdownItem'>
            <img src={props.img} alt="Dropdown Icon" />
            <a onClick={props.onClick}>{props.text}</a>
        </li>
    );
}

export default ProfileDropdownMenu;
