import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { Header, Footer } from '../Headre-Footer/Header-Footer';
import './Homepage.css';
import SearchBar from "../SearchBar/SearchBar";
import Search from "../SearchBar/SearchBar";


function Card({ text, imageSrc, categoryId }) {
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
        <Link to={`/products/${categoryId}`} className="card-link">
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
        </Link>
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
            </div>
            <div>
                <h1 className="body_text">Main Categories</h1>
            </div>
            <div className="card-container">
                {categories.map((category) => (
                    <Card
                        key={category.id}
                        categoryId={category.id}
                        imageSrc={category.image}
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