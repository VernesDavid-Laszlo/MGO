import "./ProductsbyCategory.css"
import { Header, Footer } from '../Headre-Footer/Header-Footer';
import MGO_logo from "./images/MGO_logo.png";

const Card = () => {
    return (
        <div className="centerPBC">
            <div className="cardPBC">
                <img src={MGO_logo} alt="Product" className="cardImagePBC" />

                <div className="cardContentPBC">
                    <div className="productNameAndPricePBC">
                        <p>Product Name</p>
                        <div className="priceTagPBC">
                            <p>Price: 199.99 LEI</p>
                        </div>
                    </div>

                    <p className="userLocationPBC">User Location</p>
                </div>
            </div>
        </div>
    );
};
function ProductsByCategory() {
    return (
        <div className="bodyPBC">
            <div>
                <Header />
            </div>
            <div>
                <Card />
                <Card />
                <Card />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default ProductsByCategory;
