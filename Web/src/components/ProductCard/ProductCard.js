import React, {useEffect, useState} from "react";
import {getDownloadURL, getStorage, ref} from "firebase/storage";

import "./ProductCard.css"
function ProductCard({ product, user,onClick }) {
    const [imageUrl, setImageUrl] = useState('');

    const fetchImageUrl = async () => {
        try {
            const storage = getStorage();
            const imageRef = ref(storage, `Products/${product.id}/${product.images[0]}`);
            const url = await getDownloadURL(imageRef);
            setImageUrl(url);
        } catch (error) {
            console.error('Error fetching image URL from Firebase Storage: ', error);
        }
    };

    useEffect(() => {
        fetchImageUrl();
    }, [product.id, product.images]);

    return (
        <div className="centerPBC">
            <div className="cardPBC" onClick={onClick}>
                {imageUrl ? (
                    <img src={imageUrl} alt="Product" className="cardImagePBC" />
                ) : (
                    <div>Loading image...</div>
                )}

                <div className="cardContentPBC">
                    <div className="productNameAndPricePBC">
                        <p style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                            {product.product_name}
                        </p>
                        <div className="priceTagPBC">

                            <p style={{color: "black"}}> {product.price}</p>
                        </div>
                    </div>

                    <p className="userLocationPBC">Location: {user?.city}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;