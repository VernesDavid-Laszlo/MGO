import user from './ProfileIcons/user.png';
import edit from './ProfileIcons/edit.png';
import logout from './ProfileIcons/logout.png';
import './ProfileDropdownMenu.css';
import React, {useState, useEffect, useRef} from 'react';

function ProfileDropdownMenu() {

    const [open, setOpen] = useState(false);

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e)=>{
            if(!menuRef.current.contains(e.target)){
                setOpen(false);
                console.log(menuRef.current);
            }
        };

        document.addEventListener("mousedown", handler);


        return() =>{
            document.removeEventListener("mousedown", handler);
        }

    });

    return (
        <div className="App">
            <div className='menu-container' ref={menuRef}>
                <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                    <img src={user}></img>
                </div>

                <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
                    <h3>Name<br/><span>Seller</span></h3>
                    <ul>
                        <DropdownItem img = {user} text = {"My Profile"}/>
                        <DropdownItem img = {edit} text = {"Edit Profile"}/>
                        <DropdownItem img = {logout} text = {"Logout"}/>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function DropdownItem(props){
    return(
        <li className = 'dropdownItem'>
            <img src={props.img}></img>
            <a> {props.text} </a>
        </li>
    );
}

export default ProfileDropdownMenu;