import React, { useEffect, useState } from 'react';
import { Header, Footer } from '../Headre-Footer/Header-Footer';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import './Homepage.css';




function Card({ text, imageSrc }) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const storage = getStorage();
                const imageRef = ref(storage, `Home_category_images/${imageSrc}`);
                const url = await getDownloadURL(imageRef);
                setImageUrl(url);
            } catch (error) {
                console.error('Error fetching image URL from Firebase Storage: ', error);
            }
        };

        fetchImageUrl();
    }, [imageSrc]);

    return (
        <div className="card">
            <div className="image-container">
                {imageUrl ? (
                    <img src={imageUrl} alt="Card Background" className="card-image" />
                ) : (
                    <div>Loading image...</div>
                )}
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


function HomePage() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore();
            const colRef = collection(db, 'category');

            try {
                const snapshot = await getDocs(colRef);
                const categoriesData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching data from Firestore: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="appStyle">
            <div>
                <Header />
                <Search/>
            </div>
            <div>
                <h1 className="body_text">Main Categories</h1>
            </div>
            <div className="card-container">
                {categories.map((category) => (
                    <Card
                        key={category.id}
                        imageSrc={category.image} // Assuming the 'image' field in Firestore contains the image filename
                        text={category.category_name}
                    />
                ))}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default HomePage;