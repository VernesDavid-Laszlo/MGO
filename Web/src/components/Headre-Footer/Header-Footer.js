import React, { useState, useEffect } from 'react';
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import "./Header-Footer.css";
import MGO_logo from "./ProfileIcons/MGO_logo.png";
import fav from "./ProfileIcons/fav.png";
import mess from "./ProfileIcons/mess.png";
import { Link } from "react-router-dom";

export function Header() {
    const [username, setUsername] = useState("YourUsername");

    return (
        <div>
            <div className="header">
                <div className="header_left">
                    <Link to="/home">
                        <img src={MGO_logo} alt="My Logo" className="logo" />
                    </Link>
                </div>
                <div className="header_center">
                    <img src={mess} alt="Message" className="header_center_buttons" />
                    <img src={fav} alt="Favorite" className="header_center_buttons" />
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

export function Footer() {
    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector(".footer");
            const isBottom = document.documentElement.clientHeight + document.documentElement.scrollTop >= document.body.offsetHeight;

            if (isBottom) {
                footer.style.opacity = 1; // Láthatóvá teszi a láblécet
            } else {
                footer.style.opacity = 0; // Elrejti a láblécet
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="footer">
            <p> Contacts: vernes.david.laszlo@student.ms.sapientia.ro </p>
        </div>
    );
}
