import {Header, Footer} from "../Headre-Footer/Header-Footer";
import "./FavoritePage.css"

function FavPage(){
    return(
        <div className="bodyFP">
            <div>
                <Header/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
}

export default FavPage;