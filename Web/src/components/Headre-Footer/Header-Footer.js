import React, { useState } from 'react';
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import "./Header-Footer.css"

export function Header() {
    const [username, setUsername] = useState("YourUsername");

    return (
        <div>
            <div className="header">
                <div className="header_left">
                    <img src="images/MGO_logo.png" alt="My Logo" className="logo" />
                </div>
                <div className="header_center">
                    <img src="images/mess.png" alt="My Log" className="header_center_buttons" />
                    <img src="images/fav.png" alt="My Lo" className="header_center_buttons" />
                </div>
                <div className="header_right">
                    <ProfileDropdownMenu username={username} />
                    <p>space</p>
                    <button className="button">New Advertising</button>
                </div>
            </div>
        </div>
    );
}



export function Footer(){
    return(
        <div className="footer">
            <p> Contacts:vernes.david.laszlo@student.ms.sapientia.ro </p>

        </div>
    );
}