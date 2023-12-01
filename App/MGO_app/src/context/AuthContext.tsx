 import { firebase } from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
//
//
// const login = async (email: any, password: any) => {
//
//   try {
//     const userCredential = await firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password);
//
//     const userInfo = {
//       email: userCredential.user?.email || '',
//       password: password, // Note: storing the password like this is not recommended for security reasons
//     };
//
//     setUserInfo(userInfo);
//     await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
//
//     // Fetch dates from Firestore
//     const datesCollection = firestore().collection('dates'); // Replace 'dates' with your actual Firestore collection
//     const datesSnapshot = await datesCollection.get();
//     const datesData = datesSnapshot.docs.map(doc => doc.data());
//
//     // Set the retrieved dates state
//     setDates(datesData);
//
//     return true;
//   } catch (error) {
//     setLoginError(error.message);
//     return false;
//   }
// };
//
// export default AuthContext;
