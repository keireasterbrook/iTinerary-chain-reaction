import * as firebase from 'firebase/app/dist';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA2TnHOjw5H3jVy6tAoxcgRojWij105msg',
  authDomain: 'itinerary-chain-reaction.firebaseapp.com',
  databaseURL: 'https://itinerary-chain-reaction.firebaseio.com',
  projectId: 'itinerary-chain-reaction',
  storageBucket: 'itinerary-chain-reaction.appspot.com',
  messagingSenderId: '176435877300',
  appId: '1:176435877300:ios:74472b5f4a2d1c11794ee1'
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };