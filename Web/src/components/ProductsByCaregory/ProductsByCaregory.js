import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { Header, Footer } from '../Headre-Footer/Header-Footer';
import './ProductsbyCategory.css';

function ProductCard({ product }) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const storage = getStorage();
                const imageRef = ref(storage, `Prods/${product.images[0]}`);
                const url = await getDownloadURL(imageRef);
                setImageUrl(url);
            } catch (error) {
                console.error('Error fetching image URL from Firebase Storage: ', error);
            }
        };

        fetchImageUrl();
    }, [product.images]);

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
                        <p style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                            {product.product_name}
                        </p>
                        <div className="priceTagPBC">
                            <p> {product.price}</p>
                        </div>
                    </div>

                    <p className="userLocationPBC">{product.user}</p>
                </div>
            </div>
        </div>
    );
}

function ProductsByCategory() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);

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

    return (
        <div className="bodyPBC">
            <div>
                <Header />
            </div>
            <div>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default ProductsByCategory;