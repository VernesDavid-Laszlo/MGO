import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { Header } from '../Headre-Footer/Header-Footer';
import heart from './heart1.png';
import './ProductsBySearch.css';

function ProductDetails() {
    const { productId } = useParams();
    console.log('productId:', productId);
    const [product, setProduct] = useState(null);
    const [users, setUsers] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchProductDetails = async () => {
            const db = getFirestore();
            if (!productId) {
                console.error('Product ID is undefined');
                return;
            }
            try {
                console.log('Fetching product details for productId:', productId);
                const productRef = doc(db, 'products', productId);
                const productDoc = await getDoc(productRef);
                if (productDoc.exists()) {
                    setProduct(productDoc.data());
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
        if (product) {
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
        }
    }, [product]);

    const fetchImageUrl = async (product) => {
        try {
            if (productId) {
                const storage = getStorage();
                const imageRef = ref(storage, `Products/${productId}/${product.images[0]}`);
                const url = await getDownloadURL(imageRef);
                setImageUrl(url);
            } else {
                console.error('Product ID is undefined');
            }
        } catch (error) {
            console.error('Error fetching image URL from Firebase Storage: ', error);
        }
    };



    if (!product) {
        return <div>Loading...</div>;
    }

    const handleProductClick = () => {
        history.push({
            pathname: '/prodcard',
            state: { productData: product, from: 'ProductDetails' },
        });
    };

    return (
        <div>
            <Header />
            <div className="centerPS">
                <div className="cardPS" onClick={handleProductClick}>
                    {/* Kép betöltése */}
                    {imageUrl ? (
                        <img src={imageUrl} alt="Product" className="cardImagePS" />
                    ) : (
                        <div>Loading image...</div>
                    )}

                    <div className="cardContentPS">
                        <div className="productNameAndPricePS">
                            <p style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                                {product.product_name}
                            </p>
                            <div className="priceTagFP">
                                <p style={{ color: 'black' }}>{product.price}</p>
                            </div>
                        </div>
                        <p className="userLocationFP">Location: {users[product.user]?.city}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;