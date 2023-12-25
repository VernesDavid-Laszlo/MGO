import React, { useState, useEffect } from 'react';
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    updateDoc,
} from 'firebase/firestore';
import './SearchBar.css';
import { useHistory } from 'react-router-dom';

const SearchComponent = () => {
    const [isChecked, setIsChecked] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isSearchBoxClosed, setIsSearchBoxClosed] = useState(false);
    const db = getFirestore();
    const history = useHistory();

    useEffect(() => {
        // Példa arra, hogy hogyan adhatod hozzá a kisbetűs mezőt a termékekhez
        const addLowercaseFieldToProducts = async () => {
            const productsRef = collection(db, 'products');
            const snapshot = await getDocs(productsRef);

            snapshot.forEach(async (doc) => {
                const data = doc.data();
                const lowercaseName = data.product_name.toLowerCase();

                // Hozzáadja a kisbetűs mezőt a termékhez
                await updateDoc(doc.ref, { product_name_lowercase: lowercaseName });
            });
        };

        // Hívja meg a függvényt, példa adatok hozzáadásához
        addLowercaseFieldToProducts();
    }, [db]);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        setIsSearchBoxClosed(!isChecked);
        if (!isChecked) {
            setSearchText('');
            setFilteredProducts([]);
        }
    };

    const handleInputChange = async (event) => {
        const value = event.target.value.toLowerCase();
        setSearchText(value);

        try {
            const productsRef = collection(db, 'products');
            const q = query(productsRef, where('product_name_lowercase', '>=', value));

            const snapshot = await getDocs(q);
            const products = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            const filtered = products.filter((product) =>
                product.product_name_lowercase.includes(value)
            );
            setFilteredProducts(filtered);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleProductClick = async (product) => {
        setSearchText(product.product_name);
        setFilteredProducts([]);
        setIsSearchBoxClosed(true);
        history.push(`/product-details/${product.id}`);
    };
    return (
        <div className="container">
            <input
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="checkbox"
                type="checkbox"
            />
            <div className="mainbox">
                <div className="iconContainer">
                    <svg
                        viewBox="0 0 512 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        className="search_icon"
                    >
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                    </svg>
                </div>
                <input
                    className="search_input"
                    placeholder="search"
                    type="text"
                    value={searchText}
                    onChange={handleInputChange}
                    style={{
                        width: isChecked ? '0' : '170px',
                        height: isChecked ? '0px' : '100%',
                    }}
                />
                {filteredProducts.length > 0 && searchText !== '' && (
                    <div className="dropdown-container">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={index}
                                className="dropdown-item"
                                onClick={() => handleProductClick(product)}
                            >
                                {product.product_name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchComponent;
