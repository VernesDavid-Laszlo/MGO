import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Header, Footer } from "../Headre-Footer/Header-Footer";
import {getFirestore, collection, getDocs, doc, getDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductCard.css';

// ha rating = 0 akkor errort adjon, megoldani hogy lementse az indexet es az erteket
const ProductCard = () => {
    const [productData, setProductData] = useState(null);
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [userName, setUserName] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [userRating, setUserRating] = useState(null);
    const [isRatingModalOpen, setRatingModalOpen] = useState(false);
    const [newRating, setNewRating] = useState(0);
    const [hasReviewed, setHasReviewed] = useState(false);
    const firestore = getFirestore();

    const rateUser = async (userId, rating) => {
        try {
            // Get reference to the user document
            const userRef = doc(firestore, 'users', userId);

            // Fetch the current user document
            const userDoc = await getDoc(userRef);
            const userData = userDoc.data();

            // Calculate the new average rating
            const currentRatings = userData.rating || [];
            const totalRatings = currentRatings.length;
            //kiszamolja az osszegeket
            const currentTotalRating = currentRatings.reduce((sum, r) => sum + r, 0);

            const newTotalRating = currentTotalRating + rating;
            const newAverageRating = newTotalRating / (totalRatings + 1);

            // Update the rating field with the new average
            await updateDoc(userRef, {
                rating: [rating, ...currentRatings], // Add the new rating to the array
                averageRating: newAverageRating // Add a new field for average rating
            });

            alert("Your review was successful");

            // Update userRating state to trigger re-render
            setUserRating(newAverageRating);
            setHasReviewed(true);
        } catch (error) {
            console.error('Error rating user:', error);
        }
    };



    // Assuming userId is the ID of the user whose average rating you want to calculate


    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getFirestore();
                const productsCollection = collection(db, 'products');
                const productsSnapshot = await getDocs(productsCollection);

                if (!productsSnapshot.empty) {
                    // Assuming there's only one product for demonstration
                    const productDoc = productsSnapshot.docs[0];
                    const productData = productDoc.data();

                    setProductData(productData);

                    // Fetch image URLs from Firebase Storage
                    const storage = getStorage();
                    const storageRef = ref(storage, `Products/${productDoc.id}`);

                    const imageUrlsPromises = productData.images.map(async (imageName) => {
                        const imageUrl = await getDownloadURL(ref(storageRef, imageName));
                        return imageUrl;
                    });

                    const urls = await Promise.all(imageUrlsPromises);
                    setImageUrls(urls);

                    // Fetch user data based on the product's user field
                    const userDoc = await getDoc(doc(collection(db, 'users'), productData.user));

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUserPhoneNumber(userData.phoneNumber);
                        setUserName(userData.userName);
                        setUserRating(userData.averageRating);

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
                                <h4 id="productCardtitle">{productData.product_name}</h4>
                                <h4 id="productCardprice">Price: {productData.price}</h4>
                                <label>Description</label>
                                <br />
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
                                                <div id = "rate-user-content">
                                                    <div id = "rate-user-form">
                                                    <label>Select a rating:</label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max="5"
                                                        value={newRating}
                                                        onChange={handleRatingChange}
                                                    />
                                                    </div>
                                                    <button id = "rate-user-button" onClick={submitRating}>Submit Rating</button>

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button id="productCardPhoneButton">{userPhoneNumber}</button>
                            <button id="productCardMessageButton">Send message</button>

                        </div>
                    </div>
                )}
            </div>
            <div id="footer">
                <Footer />
            </div>
        </div>
    );
};

export default ProductCard;
