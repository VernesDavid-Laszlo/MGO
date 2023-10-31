import "./Homepage.css"


function Card({ imageSrc, text }) {
    return (
        <div className="card">
            <div className="image-container">
                <img src={imageSrc} alt="Card Background" className="card-image" />
            </div>
            <p className="card-text">{text}</p>
        </div>
    );
}

function Search() {
    return (
        <div className="search">
            <div className="search-box">
                <div className="search-field">
                    <input placeholder="Search..." className="input" type="text" />
                    <div className="search-box-icon">
                        <button className="btn-icon-content">
                            <i className="search-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    version="1.1"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                                        fill="#fff"
                                    ></path>
                                </svg>
                            </i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


function Header() {

    return (
        <div>
            <div className="header">
                <div className="header_left">
                    <img src="images/MGO_logo.png" alt="My Logo" className="logo" />
                </div>
                <div className="header_center">
                    <img src="images/mess.png" alt="My Log" className="header_center_buttons" />
                    <img src="images/fav.png" alt="My Lo" className="header_center_buttons" />
                    <button className="button">Account</button>
                </div>
                <div className="header_right">
                    <button className="button">New Advertising</button>
                </div>
            </div>
            <div>
                <div>r</div>
                <div>r</div>
                <Search/>
            </div>
            <div>
                <h1 className="body_text">Main Categories</h1>
            </div>
            <div className="card-container">
                <Card imageSrc="images/car.png" text="Cars" />
                <Card imageSrc="images/phone.jpg" text="Phones" />
                <Card imageSrc="images/laptopL.jpg" text="Laptops" />
                <Card imageSrc="images/jbl.jpg" text="Speakers" />
                <Card imageSrc="images/tv.jpg" text="TV's" />
                <Card imageSrc="images/dress.jpg" text="Clothes" />
                <Card imageSrc="images/house.jpg" text="Household" />
                <Card imageSrc="images/fumes.jpg" text="Fragrances" />
                {/* Ide add hozzá további kártyákat szükség szerint */}
            </div>
            <div className="footer">
                <p> contacts</p>
            </div>
        </div>
    );
}

export default Header;


