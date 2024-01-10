import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
import './ProductsbyCategory.css';
import ProductCard from "../ProductCard/ProductCard";



function ProductsByCategory() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState({});
    const [sortCriteria, setSortCriteria] = useState('default');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Fixed variable name
    const history = useHistory();

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
        if (sortCriteria !== 'default') {
            let sortedProducts = [...products];

            switch (sortCriteria) {
                case 'name':
                    sortedProducts.sort((a, b) =>
                        sortOrder === 'asc' ? a.product_name.localeCompare(b.product_name) : b.product_name.localeCompare(a.product_name)
                    );
                    break;
                case 'price':
                    sortedProducts.sort((a, b) => {
                        const priceA = parseInt(a.price);
                        const priceB = parseInt(b.price);

                        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
                    });
                    break;
                default:
                    break;
            }

            setProducts(sortedProducts);
        }
    };

    const handleSortChange = (event) => {
        const value = event.target.value;
        if (value === 'default') {
            setIsDropdownOpen(false);
            return;
        }
        setSortCriteria(value.split('-')[0]);
        setSortOrder(value.split('-')[1]);
    };

    useEffect(() => {
        sortProducts();
    }, [sortCriteria, sortOrder]);

    const handleFavoriteClick = (product) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!favorites.find((fav) => fav.id === product.id)) {
            favorites.push(product);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert('Product added to favorites!');
        } else {
            alert('Product is already in favorites!');
        }
    };

    const handleProductCardClick = (product) => {
        // A termék kiválasztása után megteheted, amit szeretnél.
        // Például navigálhatsz a Product oldalra, és átadhatod a kiválasztott termék adatait.
        // history.push('/prodcard');
        history.push({
            pathname: '/prodcard', // Az útvonal, ahova navigálsz
            state: { productData: product }, // A termék adatai, amit továbbítasz
        });
    };

    return (
        <div className="bodyPBC">
            <div>
                <Header/>
            </div>
            <div className="centerPBC">
                <div className="dropdownPBC">
                    <select
                        id="sort"
                        value={`${sortCriteria}-${sortOrder}`}
                        onChange={handleSortChange}
                        onClick={() => setIsDropdownOpen(true)}
                        onBlur={() => setIsDropdownOpen(false)}
                    >
                        {!isDropdownOpen && <option value="default">Sort By:</option>}
                        <option value="name-asc">Name Ascending</option>
                        <option value="name-desc">Name Descending</option>
                        <option value="price-asc">Price Ascending</option>
                        <option value="price-desc">Price Descending</option>
                    </select>
                </div>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} user={users[product.user]} onFavoriteClick={handleFavoriteClick} onClick={() => handleProductCardClick(product)} />
                ))}
            </div>
            <div>
                {/*<Footer/>*/}
            </div>
        </div>
    );
}

export default ProductsByCategory;
