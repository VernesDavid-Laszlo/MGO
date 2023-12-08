import React, {useEffect, useState} from 'react';
import { getAuth } from 'firebase/auth';
import {collection, getFirestore, addDoc, updateDoc, doc, arrayUnion} from 'firebase/firestore';
import { Header, Footer } from '../Headre-Footer/Header-Footer';
import Uploadpage from './UploadPage.css'
import firebase from "firebase/compat/app";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";


//


//kell meg productId, kep, userId, publishedTimer
//a title-t at kell irni product_name-ra
const UploadPage = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [category, setCategory] = useState('');

    const [city, setCity] = useState('');
    const auth = getAuth();
    const db = getFirestore();
    const user = firebase.auth.currentUser;
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = firebase.auth().currentUser;

                if (currentUser) {
                    const userDoc = await firebase.firestore().collection('users').doc(currentUser.uid).get();

                    if (userDoc.exists) {
                        setUsername(userDoc.data().userName);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchData();
    }, []);

    const [selectedImages, setSelectedImages] = useState([]); // New state for selected images

    const handleImageChange = (e) => {
        const files = e.target.files;

        // Update the selectedImages state by combining the existing and new images
        setSelectedImages((prevImages) => [...prevImages, ...Array.from(files)]);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handlePriceChange = (e) => {
        if ( !isNaN(e.target.value)){
            setPrice(e.target.value);}
    };

    const handlePhoneNumberChange = (e) => {
        if ( !isNaN(e.target.value)){
        setPhoneNumber(e.target.value);}
    };

    const handleProductDescriptionChange = (e) => {
        setProductDescription(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSaveChanges = async () => {
        if (!title || !city || !price || !phoneNumber || !productDescription || !category || selectedImages.length === 0) {
            alert("Please fill all the fields and select at least one image");
            return;
        }

        try {
            const currentUser = firebase.auth().currentUser;

            if (currentUser) {
                const userId = currentUser.uid;

                // Create a reference to the 'products' collection
                const productRef = collection(db, 'products');

                // Add product data to Firestore
                const newProductDocRef = await addDoc(productRef, {
                    title,
                    city,
                    price,
                    phoneNumber,
                    productDescription,
                    category,
                    userId,
                });

                // Get the newly created product ID
                const productId = newProductDocRef.id;

                // Upload each selected image to Firebase Storage in the 'Products/{productId}' folder
                const storage = getStorage();
                const storageRef = ref(storage, `Products/${productId}`);

                //Puts the images in firebase
                for (const image of selectedImages) {
                    const imageRef = ref(storageRef, image.name);
                    const uploadTask = uploadBytesResumable(imageRef, image);

                    // Wait for the upload to complete
                    await uploadTask;

                    // Get the download URL for the uploaded image
                    const imageUrl = await getDownloadURL(imageRef);

                    // Update the product document in Firestore with the image URL
                    await updateDoc(doc(db, 'products', productId), {
                        images: arrayUnion(imageUrl),
                    });
                }

                console.log('Product data and images uploaded successfully to Firestore and Storage');
            } else {
                alert('User not found');
            }
        } catch (error) {
            console.error('Error uploading product data to Firestore:', error);
        }

        // Reset the state variables
        setTitle('');
        setCity('');
        setPrice('');
        setPhoneNumber('');
        setProductDescription('');
        setCategory('');
        setSelectedImages([]);
    };

    const handleDeleteImage = (index) => {
        // Create a copy of the selectedImages array
        const updatedImages = [...selectedImages];

        // Remove the selected image at the specified index
        updatedImages.splice(index, 1);

        // Update the state with the new array of selected images
        setSelectedImages(updatedImages);
    };


    return (
        <div>
            <Header />
            <div className="bodyUP">
                <div className="cardContainerUP">
                    <div id="uploadPageTitle">
                        <h2>{setUsername} You can upload your products here </h2>
                    </div>
                    <div id="userUploadForm">
                        <div>
                            <UploadPageLabel
                                id="title"
                                label="Title"
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                placeholder=""
                            />
                        </div>

                        <div>
                            <UploadPageLabel
                                id="city"
                                label="City"
                                type="text"
                                value={city}
                                onChange={handleCityChange}
                                placeholder=""
                            />
                        </div>
                        <div>
                            <UploadPageLabel
                                id="price"
                                label="Price"
                                type="text"
                                value={price}
                                onChange={handlePriceChange}
                                placeholder=""
                            />
                        </div>
                        <div>
                            <UploadPageLabel
                                id="phoneNumber"
                                label="Contact number"
                                type="text"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                placeholder=""
                            />
                        </div>
                    </div>

                </div>
                <div id="descriptionUploadPage">
                    <div>
                        <UploadPageLabelTextarea
                            id="productDescription"
                            label="Product description"
                            type="textarea"
                            value={productDescription}
                            onChange={handleProductDescriptionChange}
                            placeholder=''
                        />
                    </div>
                </div>
                <div id="imageUploadPage">
                    <div>
                        <label htmlFor="image">Select Images:</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            multiple
                            style={{ display: 'none' }}
                        />
                    </div>
                    {selectedImages.length > 0 && (
                        <div>
                            <h3>Selected Images:</h3>
                            <div style={{ display: 'flex',justifyContent: 'flex-start'}}>
                                {selectedImages.map((image, index) => (
                                    <div key={index} style={{ position: 'relative', marginBottom: '10px' , maxWidth: '100px', maxHeight:'100px', padding: '20px'}}>
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Selected Image ${index + 1}`}
                                            style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }}
                                        />
                                        <button
                                            onClick={() => handleDeleteImage(index)}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                padding: '5px',
                                                cursor: 'pointer',
                                                background: 'transparent',
                                                border: 'none',
                                                color: 'red',
                                            }}
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div id="categoryUploadPage">
                    <div>
                        <label htmlFor="category">Product category:</label>
                        <select id="category" value={category} onChange={handleCategoryChange}>
                            <option value="" disabled>
                                Select a category
                            </option>
                            <option value="Electronics">TV's</option>
                            <option value="Clothing">Laptops</option>
                            <option value="Books">Phones</option>
                            <option value="Perfumes">Cars</option>
                            <option value="Cars">Household</option>
                            <option value="Toys">Clothes</option>
                            <option value="Sports">Fragrances</option>
                            <option value="Sports">Speakers</option>
                            <option value="Entertainment">Others</option>
                            {/* Add more categories as needed */}
                        </select>
                    </div>
                    <button onClick={handleSaveChanges} id="buttonUploadPage">
                        Upload product
                    </button>
                </div>
                <div className="footerUploadPage">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

const UploadPageLabel = (props) => (
    <>
        <label htmlFor={props.id}>{props.label}:</label>
        <input
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
        />
    </>
);

const UploadPageLabelTextarea = (props) => (
    <>
        <label htmlFor={props.id}>{props.label}:</label>
        <textarea
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
        />
    </>
);

export default UploadPage;
