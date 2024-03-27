import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { getFirestore, doc, getDocs, collection } from "@firebase/firestore"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatBot from './src/Screens/ChatBot'
import Home from './src/Screens/Home';
import ActivitiesList from './src/Screens/ActivitiesList';
import ItineraryCalendar from './src/Screens/Itinerary-calendar';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();


const firebaseConfig = {
  apiKey: "AIzaSyB7bfrVbhW5SQunUTrorpqvDyV_sY45SKY",
  authDomain: "itinerary-chain-reaction.firebaseapp.com",
  projectId: "itinerary-chain-reaction",
  storageBucket: "itinerary-chain-reaction.appspot.com",
  messagingSenderId: "176435877300",
  appId: "1:176435877300:web:6820350fd359e32c794ee1",
  measurementId: "G-4EM8V1K06L"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

//getting all documents
const colRef = collection(db, 'Activities')
async function dataFetchAttempt(){
  const snapshot = await getDocs(colRef);
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

dataFetchAttempt()

export default App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  
    return () => unsubscribe();
  }, [auth]);

  
      const handleAuthentication = async () => {
        try {
          if (user) {
            // If user is already authenticated, log out
            console.log('User logged out successfully!');
            await signOut(auth);
          } else {
            // Sign in or sign up
            if (isLogin) {
              // Sign in
              await signInWithEmailAndPassword(auth, email, password);
              console.log('User signed in successfully!');
            } else {
              // Sign up
              await createUserWithEmailAndPassword(auth, email, password);
              console.log('User created successfully!');
            }
          }
        } catch (error) {
          console.error('Authentication error:', error.message);
        }
      };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' >
      <Stack.Screen name='Home' children={(props) => <Home {...props}
      user={user} 
      handleAuthentication={handleAuthentication}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      isLogin={isLogin}
      setIsLogin={setIsLogin}

      />} />
      <Stack.Screen name='ChatBot' component={ChatBot}/>
      <Stack.Screen name='ActivitiesList' component={ActivitiesList}/>
      <Stack.Screen name='Itinerary-calendar' component={ItineraryCalendar}/>
      </Stack.Navigator>
    </NavigationContainer>

  
  );
}

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBayStyle: {
    positon: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff",
  },
};
const NavBar = () => {
  return (
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={{ fontSize: 12, color: "#16247d" }}>HOME</Text>
                </View>
              );
            },
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="ChatBot"
          component={ChatBot}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={{ fontSize: 12, color: "#16247d" }}>ADD TRIP</Text>
                </View>
              );
            },
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Itinerary-Calendar"
          component={ItineraryCalendar}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={{ fontSize: 12, color: "#16247d" }}>SETTINGS</Text>
                </View>
              );
            },
          }}
        ></Tab.Screen>
      </Tab.Navigator>
  );
};


export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});