import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
    getDoc,
    doc,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { Header, Footer } from '../Headre-Footer/Header-Footer';
import heart from './images/heart1.png';
import './ProductsbyCategory.css';

function ProductCard({ product, user }) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
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

        fetchImageUrl();
    }, [product.id, product.images]);

    return (
        <div className="centerPBC">
            <div className="cardPBC">
                {imageUrl ? (
                    <img src={imageUrl} alt="Product" className="cardImagePBC" />
                ) : (
                    <div>Loading image...</div>
                )}

                <div className="cardContentPBC">
                    <div className="productNameAndPricePBC">
                        <img src={heart} alt="Heart" className="faviconPBC" />
                        <div className="priceTagPBC">
                            <p> {product.price}</p>
                        </div>
                    </div>
                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                        {product.product_name}
                    </p>
                    <p className="userLocationPBC">Location: {user?.city}</p>
                </div>
            </div>
        </div>
    );
}

function ProductsByCategory() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState({});
    const [sortCriteria, setSortCriteria] = useState('price'); // Default sorting criteria
    const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore();
            const productsRef = collection(db, 'products');
            const q = query(productsRef, where('category', '==', categoryId));

            try {
                const snapshot = await getDocs(q);
                const productsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching data from Firestore: ', error);
            }
        };

        fetchData();
    }, [categoryId]);

    useEffect(() => {
        const fetchUserData = async () => {
            const db = getFirestore();
            const usersRef = collection(db, 'users');

            try {
                for (const product of products) {
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
    }, [products]);

    const sortProducts = () => {
        let sortedProducts = [...products];

        switch (sortCriteria) {
            case 'name':
                sortedProducts.sort((a, b) =>
                    sortOrder === 'asc' ? a.product_name.localeCompare(b.product_name) : b.product_name.localeCompare(a.product_name)
                );
                break;
            default:
                break;
        }

        setProducts(sortedProducts);
    };

    const handleSortChange = (event) => {
        const value = event.target.value;
        setSortCriteria(value.split('-')[0]);
        setSortOrder(value.split('-')[1]);
    };

    useEffect(() => {
        sortProducts();
    }, [sortCriteria, sortOrder]);

    return (
        <div className="bodyPBC">
            <div>
                <Header />
            </div>
            <div>
                <div className="dropdownPBC">
                    <select id="sort" value={`${sortCriteria}-${sortOrder}`} onChange={handleSortChange}>
                        <option value="name-asc">Name Ascending</option>
                        <option value="name-desc">Name Descending</option>
                    </select>
                </div>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} user={users[product.user]} />
                ))}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default ProductsByCategory;
