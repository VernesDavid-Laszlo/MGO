import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import {deleteDoc, getFirestore} from "firebase/firestore";
import { getAuth} from "firebase/auth";
import './AdminPage.css';
import {doc} from "firebase/firestore";
import {Header} from "../Headre-Footer/Header-Footer";
import {deleteObject, getDownloadURL, getStorage, ref} from "firebase/storage";


const AdminPage = () => {
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userList, setUserList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [category, setCategory] = useState('');
    const [productsUserName, setProductsUserName] = useState('');
    const [productName, setProductName] = useState('');
    const auth = getAuth();
    const user = auth.currentUser;


    const fetchResults = (querySnapshot) => {
        setUserList([]);
        querySnapshot.forEach((doc) => {
            const userData = [doc.data(),doc.id];
            setUserList((prevUserList) => [...prevUserList, userData]);

        });
    };

    const fetchProductData = (querySnapshot) => {
        setProductList([]);
        const uniqueIds = new Set(productList.map(([data, id]) => id));

        querySnapshot.forEach((doc) => {
            const productData = [doc.data(), doc.id];

            if (!uniqueIds.has(productData[1])) {
                setProductList((prevProductList) => [...prevProductList, productData]);
            }

            console.log(productList);
        });
    };

    const allUsers = () => {
        setUserList([]);
        firebase.firestore().collection('users')
            .get()
            .then(fetchResults)
            .catch((error) => {
                console.error("Error getting documents: ", error);
            });
    }

    const allProducts = () => {
        setUserList([]);
        firebase.firestore().collection('products')
            .get()
            .then(fetchProductData)
            .catch((error) => {
                console.error("Error getting documents: ", error);
            });
    }

    const searchUsersByCity = () => {
        const cityInputTrimmed = city.trim();

        // Query Firestore for City
        firebase.firestore().collection('users').where('city', '==', cityInputTrimmed)
            .get()
            .then(fetchResults)
            .catch((error) => {
                console.error("Error getting city documents: ", error);
            });
    }



    const searchUsersByUserName = () => {
        const userNameInputTrimmed = userName.trim();
        setUserList([]);

        firebase.firestore().collection('users').where('userName', '==', userNameInputTrimmed)
            .get()
            .then(fetchResults)
            .catch((error) => {
                console.error("Error getting userName documents: ", error);
            });


    };

    const searchUsersByPhoneNumber = () => {
        const phoneNumberInputTrimmed = phoneNumber.trim();
        setUserList([]);
        firebase.firestore().collection('users').where('phoneNumber', '==', phoneNumberInputTrimmed)
            .get()
            .then(fetchResults)
            .catch((error) => {
                console.error("Error getting phoneNumber documents: ", error);
            });
    }

    const searchUsersByEmail = () => {
        const emailInputTrimmed = email.trim();
        console.log(emailInputTrimmed);
        setUserList([]);
        (setEmail(''));
        firebase.firestore().collection('users').where('email', '==', emailInputTrimmed)
            .get()
            .then (fetchResults)
            .catch((error) => {
                console.error("Error getting email documents: ", error);
            });
    }

    const searchProductsByCategory = async () => {
        const categoryInputTrimmed = category.trim();
        setCategory('');
        try {
            const userSnapshot = await firebase.firestore().collection('category').where('category_name', '==', categoryInputTrimmed).get();

            if (!userSnapshot.empty) {
                const categoryIds = userSnapshot.docs.map(doc => doc.id);

                await firebase.firestore().collection('products')
                    .where('category', 'in', categoryIds).get().then(fetchProductData);


            } else {
                console.log("No users categories with the specified data");
            }
        } catch (error) {
            console.error("Error searching for products by city:", error);
        }
    }

    const searchProductsByCity = async () => {
        const cityInputTrimmed = city.trim();
        setCity('');
        try {
            const userSnapshot = await firebase.firestore().collection('users').where('city', '==', cityInputTrimmed).get();

            if (!userSnapshot.empty) {
                const userIds = userSnapshot.docs.map(doc => doc.id);

                await firebase.firestore().collection('products')
                    .where('user', 'in', userIds).get().then(fetchProductData);


            } else {
                console.log("No users found with the specified city");
            }
        } catch (error) {
            console.error("Error searching for products by city:", error);
        }
    }

    const searchProductsByUser = async () => {
        const productsUserNameInputTrimmed = productsUserName.trim();
        setProductsUserName('');
        try {
            const userSnapshot = await firebase.firestore().collection('users').where('userName', '==', productsUserNameInputTrimmed).get();

            if (!userSnapshot.empty) {
                const userIds = userSnapshot.docs.map(doc => doc.id);

                await firebase.firestore().collection('products')
                    .where('user', 'in', userIds).get().then(fetchProductData);


            } else {
                console.log("No users found with the specified city");
            }
        } catch (error) {
            console.error("Error searching for products by city:", error);
        }
    }

    const searchProductsByProduct_name = () => {
        const productNameInputTrimmed = productName.trim();
        setProductName('');

        firebase.firestore().collection('products').where('product_name', '==', productNameInputTrimmed)
            .get().then(fetchProductData).catch((error) => {
                console.error("Error getting products by name documents: ", error);
        })

    }

    const handleDelete = (Id,collection) => {
        deleteDoc(doc(firebase.firestore(), collection, Id))
            .then(() => {
                alert( collection + 'deleted');
                setUserList((prevUserList) => prevUserList.filter((user) => user[1] !== Id));
                setProductList((prevProductList) => prevProductList.filter((product) => product[1] !== Id));

            })
            .catch((error) => {
                console.error("Error deleting {{collection}}: ", error);
            });
    };
    const deleteProduct = async (productID) => {
        try {

            // Delete folder from Storage
            const storage = getStorage();
            const folderRef = ref(storage, `gs://mgoo-faa26.appspot.com/Products/${productID}`);



            console.log(folderRef)
            await deleteObject(folderRef);

            console.log(`Folder for product ID ${productID} deleted from Storage`);

            // Delete document from Firestore
            const firestore = getFirestore();
            const productDocRef = doc(firestore, 'products', productID);
            await deleteDoc(productDocRef);

            console.log(`Document for product ID ${productID} deleted from Firestore`);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };


    return (
        <div id = "allAdminPage">
            <div id = "headerAdminPage">
                <Header />
            </div>
           <div id = "adminPageUserSearch">
                <h1>User Search</h1>


                <AdminPageLabel
                    label="City:"
                    type="text"
                    id="cityInput"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onClick={searchUsersByCity}
                />

                <AdminPageLabel
                    label="Name:"
                    type="text"
                    id="nameInput"
                    placeholder="Enter name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onClick={searchUsersByUserName}
                />

                <AdminPageLabel
                    label="Phone number:"
                    type="text"
                    id="nameInput"
                    placeholder="Enter name"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onClick={searchUsersByPhoneNumber}
                />
                <AdminPageLabel
                    label="Email:"
                    type="text"
                    id="nameInput"
                    placeholder="Enter name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onClick={searchUsersByEmail}
                />

               <button id = "allUsersButton" onClick={allUsers}>Get All Users</button>

               <ul id = "adminPageUserList">
                   {userList.map((userData) => (
                       <li key={userData[1]}> {/* Access the document ID from the array */}
                           Name: {userData[0].userName}, City: {userData[0].city}, Email: {userData[0].email}, Phone: {userData[0].phoneNumber}
                           <button onClick={() => handleDelete(userData[1],'users')}>Delete</button>
                       </li>
                   ))}
               </ul>
           </div>

            <div id = "adminPageProductSearch">
                    <h1>Product Search</h1>
                    <AdminPageLabel
                        label="Category:"
                        type="text"
                        id="categoryInput"
                        placeholder="Enter category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        onClick={searchProductsByCategory}
                    />

                <AdminPageLabel
                    label="User Name:"
                    type="text"
                    id="nameInputProduct"
                    placeholder="Enter user name"
                    value={productsUserName}
                    onChange={(e) => setProductsUserName(e.target.value)}
                    onClick={searchProductsByUser}
                />

                <AdminPageLabel
                    label="Product name:"
                    type="text"
                    id="productNameInput"
                    placeholder="Enter name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    onClick={searchProductsByProduct_name}
                />

                <AdminPageLabel
                    label="City:"
                    type="text"
                    id="cityInput"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onClick={searchProductsByCity}
                />
                <button id = "allProductsButton" onClick={allProducts}>Get All Products</button>


                <ul id = "adminPageProductList">
                    {productList.map((productData) => (
                        <li key={productData[1]}> {/* Access the document ID from the array */}
                            Name: {productData[0].userName}, City: {productData[0].product_name}, Email: {productData[0].category}, Phone: {productData[0].price}
                            <button onClick={() => handleDelete(productData[1],'products')}>Delete</button>
                            <button onClick={() => deleteProduct(productData[1])}>Delete product definitively </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const AdminPageLabel = (props) => (
    <>
        <label htmlFor={props.id}>Search by {props.label}:</label>
        <input
            type={props.type}
            id={props.id}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
        <button onClick={props.onClick}>Search</button>
    </>
)

export default AdminPage;
