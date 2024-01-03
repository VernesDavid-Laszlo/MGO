import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import { Header, Footer } from "../Headre-Footer/Header-Footer";
import { getFirestore, collection, getDocs, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Product.css';
import heart from "./heart.png"
import Chat from "../Chat/Chat";
import { getAuth } from 'firebase/auth';

const Product = () => {
    const [productData, setProductData] = useState(null);
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [userName, setUserName] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [userRating, setUserRating] = useState(null);
    const [isRatingModalOpen, setRatingModalOpen] = useState(false);
    const [newRating, setNewRating] = useState(0);
    const [hasReviewed, setHasReviewed] = useState(false);
    const firestore = getFirestore();
    const location = useLocation();
    const [favorites, setFavorites] = useState([]);
    const [isChatOpen, setChatOpen] = useState(false);
    const [recipientUserId, setRecipientUserId] = useState(null);
    const [senderUserId, setSenderUserId] = useState(null);

    const openChat = (recipientUserId) => {
        setChatOpen(true);
        setRecipientUserId(recipientUserId);
    };

    const closeChat = () => {
        setChatOpen(false);
    };

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);

        const auth = getAuth(); // Import getAuth from firebase/auth
        const user = auth.currentUser;
        if (user) {
            setSenderUserId(user.uid);
        }
    }, []);

    useEffect(() => {
        if (location.state && location.state.productData) {
            const product = location.state.productData;
            setProductData(product);

            const storage = getStorage();
            const storageRef = ref(storage, `Products/${product.id}`);

            const imageUrlsPromises = product.images.map(async (imageName) => {
                const imageUrl = await getDownloadURL(ref(storageRef, imageName));
                return imageUrl;
            });

            Promise.all(imageUrlsPromises).then((urls) => {
                setImageUrls(urls);
            });

            const db = getFirestore();
            const userDocRef = doc(db, 'users', product.user);
            getDoc(userDocRef)
                .then((userDoc) => {
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUserPhoneNumber(userData.phoneNumber);
                        setUserName(userData.userName);
                        setUserRating(userData.averageRating !== undefined ? userData.averageRating : null);
                    } else {
                        console.error('User not found');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [location.state]);

    const handleFavoriteClick = () => {
        if (!favorites.find((fav) => fav.id === productData.id)) {
            const updatedFavorites = [...favorites, productData];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            alert('Product added to favorites!');
        } else {
            alert('Product is already in favorites!');
        }
    };


    const rateUser = async (userId, rating) => {
        try {
            const userRef = doc(firestore, 'users', userId);
            const userDoc = await getDoc(userRef);
            const userData = userDoc.data();

            const currentRatings = userData.rating || [];
            const totalRatings = currentRatings.length;
            const currentTotalRating = currentRatings.reduce((sum, r) => sum + r, 0);

            const newTotalRating = currentTotalRating + rating;
            const newAverageRating = newTotalRating / (totalRatings + 1);

            await updateDoc(userRef, {
                rating: [rating, ...currentRatings],
                averageRating: newAverageRating
            });

            alert("Your review was successful");

            setUserRating(newAverageRating);
            setHasReviewed(true);
        } catch (error) {
            console.error('Error rating user:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getFirestore();
                const productsCollection = collection(db, 'products');
                const productsSnapshot = await getDocs(productsCollection);

                if (!productsSnapshot.empty) {
                    const productDoc = productsSnapshot.docs;
                    const productData = productDoc.data();

                    setProductData(productData);

                    const storage = getStorage();
                    const storageRef = ref(storage, `Products/${productDoc.id}`);

                    const imageUrlsPromises = productData.images.map(async (imageName) => {
                        const imageUrl = await getDownloadURL(ref(storageRef, imageName));
                        return imageUrl;
                    });

                    const urls = await Promise.all(imageUrlsPromises);
                    setImageUrls(urls);

                    const userDoc = await getDoc(doc(collection(db, 'users'), productData.user));

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUserPhoneNumber(userData.phoneNumber);
                        setUserName(userData.userName);
                        setUserRating(userData.averageRating !== undefined ? userData.averageRating : null);

                    } else {
                        console.error('User not found');
                    }
                } else {
                    console.error('No products found');
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchData();
    }, []);

    const handleRatingChange = (event) => {
        setNewRating(Number(event.target.value));
    };

    const closeRatingModal = () => {
        setRatingModalOpen(false);
    };

    const submitRating = () => {
        if (newRating === 0 || newRating > 5) {
            alert('Please rate the product from 1 to 5');
            return;
        }
        rateUser(productData.user, newRating);
        closeRatingModal();
    };

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
    };

    return (
        <div id="productCard">
            <div id="headerPC">
                <Header />
            </div>
            <div id="bodyPC">
                {productData && (
                    <div className="parent">
                        <div className="div4">
                            <div className="div1">
                                <Slider {...carouselSettings}>
                                    {imageUrls.map((imageUrl, index) => (
                                        <div key={index}>
                                            <img src={imageUrl} alt={`Product Image ${index + 1}`} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <div className="div2">
                                <div className="distance">
                                    <h4 id="productCardtitle">{productData.product_name}</h4>
                                    <img src={heart} alt="Heart" className="faviconPC" onClick={handleFavoriteClick}/>
                                </div>

                                <h4 id="productCardprice">Price: {productData.price}</h4>
                                <h4>Description</h4>
                                <p id="productCardDescription">{productData.description}</p>
                            </div>
                        </div>
                        <div className="div3">
                            <label id="productCardUserName">Sold by:</label>
                            <p id="productCardUserName">{userName}</p>
                            <div id="userRatingSection" className="user-rating-section">
                                <label>User's Rating: {userRating !== null ? userRating.toFixed(2) : 'N/A'}</label>
                                <p id="userRating" className={hasReviewed ? "reviewed" : ""}>
                                    {hasReviewed ? "Thanks for your review" : null}
                                </p>
                                <div className={`rating-modal ${hasReviewed ? "disabled" : ""}`}>
                                    <div className="rating-modal-content">
                                        <div className="rate-user-content">
                                            {hasReviewed ? (
                                                <div></div>
                                            ) : (
                                                <div id="rate-user-content">
                                                    <div id="rate-user-form">
                                                        <label>Select a rating:</label>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            max="5"
                                                            value={newRating}
                                                            onChange={handleRatingChange}
                                                        />
                                                    </div>
                                                    <button id="rate-user-button" onClick={submitRating}>Submit Rating</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button id="productCardPhoneButton">{userPhoneNumber}</button>
                            <button id="productCardMessageButton" onClick={() => openChat(productData.user)}>
                                Send message
                            </button>

                            {isChatOpen && senderUserId && recipientUserId && <Chat closeChat={closeChat} senderUserId={senderUserId} recipientUserId={recipientUserId} />}

                        </div>
                    </div>
                )}
            </div>
            <div id="footer">

            </div>
        </div>
    );
};

export default Product;
