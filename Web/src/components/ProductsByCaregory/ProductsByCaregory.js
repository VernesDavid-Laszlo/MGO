import "./ProductsbyCategory.css"
import {Footer, Header} from "../Headre-Footer/Header-Footer";


const Card = () => {
    return (
        <div className="centerPBC">
            <div className="cardPBC">
                <img src="./images/fumes.jpg" alt="Product" className="cardImagePBC"/>

                <div className="priceTagPBC">
                    <p>Price: 199.99 LEI</p>
                </div>
            </div>
        </div>
    );
};
function ProductsByCaregory(){
    return(
        <div className="bodyPBC">
            <div>
                <Header/>
            </div>
            <div >
                <Card/>
                <Card/>
                <Card/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
}


export default ProductsByCaregory;