// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
// import { initializeApp } from '@firebase/app';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
// import { getFirestore, doc, getDocs, collection } from "@firebase/firestore"
// import { db } from "../../App";


// const colRef = collection(db, 'Activities')
// async function dataFetchAttempt(){
//   const snapshot = await getDocs(colRef);
//   snapshot.forEach(doc => {
//     console.log(doc.id, '=>', doc.data());
//   });
// }

// // dataFetchAttempt()

// export default dataFetchAttempt;























//import firestore from '@react-native-firebase/firestore';
// const dataFetch = () => {
//     const activities = firestore().collection("activities");
//     activities.get().then((snapshot) => {
//         snapshot.forEach((doc) => {
//             console.log("helloooooooo");
//             console.log(doc.id, "=>", doc.data())
//         })
//     })
// };
// export default dataFetch;


// const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
// const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
// import { initializeApp, applicationDefault } from '@firebase/app';
// initializeApp({
//     credential: applicationDefault()
//   });
//   const db = getFirestore();

