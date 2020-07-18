import firebase from "firebase";

const firebaseConfig = {
  apiKey: 'admin-REACT_APP_NAME',
  authDomain: 'giriraj-industries.firebaseapp.com',
  databaseURL: 'https://giriraj-industries.firebaseio.com',
  projectId: 'giriraj-industries',
  storageBucket: 'giriraj-industries.appspot.com',
  messagingSenderId: '928393443662',
  appId: '1:928393443662:web:b6a402ea9f57462635c61f',
  measurementId: 'G-Y0YKZLLJH7',
};
export const fire = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default fire;
