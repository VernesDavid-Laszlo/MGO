import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import {Header} from "../Headre-Footer/Header-Footer";
import heart from './heart1.png'
import "./ProductsBySearch.css"

function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [users, setUsers] = useState({});
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            const db = getFirestore();
            try {
                console.log('Fetching product details for productId:', productId);
                const productRef = doc(db, 'products', productId);
                console.log('productRef path:', productRef.path);

                const productDoc = await getDoc(productRef);
                console.log('productDoc data:', productDoc.data());

                if (productDoc.exists()) {
                    setProduct(productDoc.data());
                    // Kép elérése a Firebase Storage-ból
                    fetchImageUrl(productDoc.data());
                } else {
                    console.log('Product not found');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    useEffect(() => {
        const fetchUserrData = async () => {
            const db = getFirestore();
            const usersRef = collection(db, 'users');

            try {
                if (Array.isArray(product)) {
                    for (const productItem of product) {

                        if (!users[productItem.user]) {
                            const userDoc = await getDoc(doc(usersRef, productItem.user));
                            if (userDoc.exists()) {
                                const userData = userDoc.data();
                                setUsers((prevUsers) => ({
                                    ...prevUsers,
                                    [productItem.user]: userData,
                                }));

                                const userCity = userData?.city;
                                console.log('User City:', userCity);
                            }
                        }
                    }
                } else if (typeof product === 'object' && product !== null) {
                    if (!users[product.user]) {
                        const userDoc = await getDoc(doc(usersRef, product.user));
                        if (userDoc.exists()) {
                            const userData = userDoc.data();
                            setUsers((prevUsers) => ({
                                ...prevUsers,
                                [product.user]: userData,
                            }));

                            const userCity = userData?.city;
                            console.log('User City:', userCity);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching user data from Firestore: ', error);
            }
        };

        fetchUserrData();
    }, [product]);

    const fetchImageUrl = async (product) => {
        try {
            const storage = getStorage();
            const imageRef = ref(storage, `Products/${productId}/${product.images[0]}`);
            const url = await getDownloadURL(imageRef);
            setImageUrl(url);
        } catch (error) {
            console.error('Error fetching image URL from Firebase Storage: ', error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <Header/>
            <div className="centerPS">
                <div className="cardPS">
                    {/* Kép betöltése */}
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="Product"
                            className="cardImagePS"
                        />
                    ) : (
                        <div>Loading image...</div>
                    )}

                    <div className="cardContentPS">
                        <div className="productNameAndPricePS">
                            <p style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                                {product.product_name}
                            </p>
                            <div className="priceTagFP">
                                <p> {product.price}</p>
                            </div>
                        </div>
                        <p className="userLocationFP">Location: {users[product.user]?.city}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;