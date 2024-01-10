import React, { useState, useEffect } from 'react';
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { Header, Footer } from "../Headre-Footer/Header-Footer";
import {getFirestore, deleteDoc,doc, getDoc } from "firebase/firestore";
import MyProfile from './MyProfile.css';
import { getStorage, ref, getDownloadURL,deleteObject } from 'firebase/storage';
import {  } from "firebase/firestore";
import async from "async";
import index from "async";

//szpiteskent ha nincs product irja ki h "no products yet"
//designelni a product list-t
const MyProfilePage = () => {
    const [userName, setUsername] = useState("Not yet specified");
    const [userAddress, setUserAddress] = useState("Not yet specified");
    const [userCity, setUserCity] = useState("Not yet specified");
    const [userPhoneNum, setUserPhoneNum] = useState("Not yet specified");
    const [userEmail, setUserEmail] = useState("Not yet specified");
    const [productList, setProductList] = useState([]);
    const [productId, setProductId] = useState([]);
    const [showProducts, setShowProducts] = useState(true);
    const auth = getAuth();
    const user = auth.currentUser;
    const firestore = getFirestore();
    const userDocRef = doc(firestore, 'users', user.uid); // current user document reference
    const [imageUrls, setImageUrls] = useState([]);
    const storage = getStorage();
    const [isProd,setIsProd] = useState(true);


    const fetchResultsMP  = (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const productData = [doc.data(), doc.id,index => index + 1];
            setProductList((prevUserList) => [...prevUserList, productData]);
            const storageRef = ref(storage, `Products/${doc.id}`);
            const imageUrl = getDownloadURL(ref(storageRef, doc.data().images[0]));
            setImageUrls(imageUrls => [...imageUrls, imageUrl]);

        });
    };



    useEffect(() => {
        const fetchData = async () => {

            try {
                const currentUser = firebase.auth().currentUser;
                console.log(currentUser.uid);

                if (currentUser) {
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUsername(userData.userName);
                        setUserAddress(userData.address);
                        setUserCity(userData.city);
                        setUserPhoneNum(userData.phoneNumber);
                        setUserEmail(userData.email);
                        console.log('User data:', userData);
                        myProducts();

                    }


                }

            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchData();
    }, []);
    function myProducts() {
        const currentUser = firebase.auth().currentUser;

        firebase.firestore().collection('products').where('user', '==', currentUser.uid).get()
            .then((querySnapshot) => {
                const productsPromises = [];
                const productIds = [];

                querySnapshot.forEach((doc) => {
                    const productData = doc.data();
                    const prodId = doc.id;

                    // Fetch the first image for each product
                    const imageRef = ref(
                        getStorage(),
                        `Products/${doc.id}/${productData.images[0]}`
                    );

                    const imagePromise = getDownloadURL(imageRef).then((imageUrl) => ({
                        ...productData,
                        imageUrl,
                    }));

                    productIds.push(prodId);
                    productsPromises.push(imagePromise);
                });

                // Wait for all image fetching promises to resolve
                return Promise.all(productsPromises).then((productsWithImages) => ({
                    productsWithImages,
                    productIds,
                }));
            })
            .then(({ productsWithImages, productIds }) => {
                // Now, productsWithImages contains an array of products with their respective image URLs
                setProductList(productsWithImages);
                setProductId(productIds); // Assuming setProductId is the setter function for productId
                console.log (productIds);
                if(productsWithImages.length === 0) {
                    setIsProd(!isProd);
                }

            })
            .catch((error) => {
                console.error("Error getting products: ", error);
            });
    }


    const handleDeleteMP = (userId) => {
        deleteDoc(doc(firebase.firestore(), 'products', userId))
            .then(() => {
                alert('Product deleted');
                // Remove user from the state
                setProductList((prevUserList) => prevUserList.filter((user) => user[1] !== userId));
            })
            .catch((error) => {
                console.error("Error deleting product: ", error);
            });
    };


    const toggleProducts = () => {
        if (showProducts) {
            setProductList([]);

        } else {
            myProducts();

        }
        setShowProducts(!showProducts);

    };


    return (
        <div>
            <Header />
            <div className="bodyMP">
                <div className="cardContainerMP">
                    <div id="myProfileTitle">
                        <h2>Your Profile {userName}</h2>
                    </div>
                    <div id="userProfileForm">
                        <div id="newAddress">
                            <MyProfileLabel
                                label="Address:"
                                text={userAddress}
                            />
                        </div>
                        <div>
                            <MyProfileLabel
                                label="City:"
                                text={userCity}
                            />
                        </div>
                        <div>
                            <MyProfileLabel
                                label="Phone Number:"
                                text={userPhoneNum}
                            />
                        </div>
                        <div id="last">
                            <MyProfileLabel
                                label="Email:"
                                text={userEmail}
                            />
                        </div>
                    </div>
                </div>

                <div id="myProfileProducts">
                    <h2>Your Products</h2>
                    {isProd ? (<button onClick={toggleProducts}>
                            {showProducts ? 'Hide' : 'Show' } My Products
                        </button>): (<p>No products yet</p>)}

                    <ul id="myProfilePageProductList">

                        {productList.map((productData, index) => {
                                try {
                                    return (
                                        <li key={index}>
                                            {productData.imageUrl && (
                                                <img src={productData.imageUrl} alt="Product Image" />
                                            )}
                                            <label>Name:&nbsp;&nbsp; {productData.product_name}</label>
                                            <span>Price: &nbsp;&nbsp; {productData.price}</span>
                                            <button onClick={() => handleDeleteMP(productId[index])}>
                                                Delete
                                            </button>
                                        </li>
                                    );
                                } catch (error) {
                                    console.error('Error rendering product:', error);
                                    return null;
                                }
                            })}
                    </ul>
                </div>
                <div id="footerMyProfile">
                    {/*<Footer />*/}
                </div>
            </div>
        </div>
    );
};

const MyProfileLabel = (props) => (
    <>
        <label>{props.label}</label>
        <text>{props.text === null ? "Not yet specified" : props.text}</text>
    </>
);

export default MyProfilePage;
