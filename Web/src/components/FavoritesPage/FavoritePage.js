import React, { useEffect, useState } from 'react';
import { Header, Footer } from '../Headre-Footer/Header-Footer';
import heart from './imagesf/heart1.png';
import { getFirestore, collection, getDocs, doc, where, getDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import './FavoritePage.css'; // Import the external CSS file

function FavoritePage() {
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [users, setUsers] = useState({});
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const fetchFavoriteProducts = async () => {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            setFavoriteProducts(favorites);
        };

        fetchFavoriteProducts();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const db = getFirestore();
            const usersRef = collection(db, 'users');

            try {
                for (const product of favoriteProducts) {
                    if (!users[product.user]) {
                        const userDoc = await getDoc(doc(usersRef, product.user));
                        if (userDoc.exists()) {
                            setUsers((prevUsers) => ({
                                ...prevUsers,
                                [product.user]: userDoc.data(),
                            }));
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching user data from Firestore: ', error);
            }
        };

        fetchUserData();
    }, [favoriteProducts]);

    useEffect(() => {
        const fetchImageUrls = async () => {
            const storage = getStorage();

            try {
                const urls = await Promise.all(
                    favoriteProducts.map(async (product) => {
                        const imageRef = ref(storage, `Products/${product.id}/${product.images[0]}`);
                        return await getDownloadURL(imageRef);
                    })
                );

                const imageUrlMap = favoriteProducts.reduce((acc, product, index) => {
                    acc[product.id] = urls[index];
                    return acc;
                }, {});

                setImageUrls(imageUrlMap);
            } catch (error) {
                console.error('Error fetching image URLs from Firebase Storage: ', error);
            }
        };

        fetchImageUrls();
    }, [favoriteProducts]);

    const removeFromFavorites = (productId) => {
        const updatedFavorites = favoriteProducts.filter((product) => product.id !== productId);
        setFavoriteProducts(updatedFavorites);
        alert("Product deleted from favorites!")

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div className="bodyFp">
            <Header />
            <div className="centerFP">
                <div className="h1text">
                    Your favourite products:
                </div>
                {favoriteProducts.map((product) => (
                    <div key={product.id} className="cardFP" onClick={() => removeFromFavorites(product.id)}>
                        {imageUrls[product.id] ? (
                            <img
                                src={imageUrls[product.id]}
                                alt="Product"
                                className="cardImageFP"
                            />
                        ) : (
                            <div>Loading image...</div>
                        )}

                        <div className="cardContentFP">
                            <div className="productNameAndPriceFP">
                                <img src={heart} alt="Heart" className="faviconFP" />
                                <div className="priceTagFP">
                                    <p> {product.price}</p>
                                </div>
                            </div>
                            <p style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                                {product.product_name}
                            </p>
                            <p className="userLocationFP">Location: {users[product.user]?.city}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default FavoritePage;
