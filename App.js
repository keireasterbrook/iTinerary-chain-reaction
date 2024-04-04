import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { getFirestore, doc, getDocs, collection } from "@firebase/firestore"
import CalendarWeek from './src/activites/CalendarWeek';
import firebaseConfig from './src/firebase/config'
import dataFetchAttempt, { dataFetch } from './src/utils/dataFetch';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatBot from './src/Screens/ChatBot'
import Home from './src/Screens/Home';
import ActivitiesList from './src/Screens/ActivitiesList';
import EventForm from './src/Components/EventForm';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import { Platform } from 'react-native';
import colours from './src/styles/colours';
import DisplayDatePicker from './src/Screens/DatePicker';


const Stack = createNativeStackNavigator();

const app = initializeApp(firebaseConfig);


export default App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);
	const [holidayObj, setHolidayObj] = useState({});
  const [startDate, setStartDate] = useState('');
  const [text, onChangeText] = useState('');
  const auth = getAuth(app);
  const [selectedRange, setSelectedRange] = useState({});
  
  const collectionName = holidayObj.destination


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
    
  <SafeAreaView style={{ flex: 1, backgroundColor: colours.darkpurple }}>
  <StatusBar translucent backgroundColor="transparent" />
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
      <Stack.Screen name='Home'  options={{ title: 'Home' }} children={(props) => <Home {...props}
      user={user} 
      handleAuthentication={handleAuthentication}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      isLogin={isLogin}
      setIsLogin={setIsLogin}

      />} />
      <Stack.Screen name='ChatBot'  options={{ title: 'ChatBot' }} children={(props) => <ChatBot {...props}
      setHolidayObj={setHolidayObj}/>}/>
      <Stack.Screen name='ActivitiesList'  options={{ title: 'Recommendations' }} children={(props) => <ActivitiesList {...props}
      holidayObj={holidayObj}/>}/>
      <Stack.Screen name='CalendarWeek'  options={{ title: 'My Itinerary' }} children={(props) => <CalendarWeek {...props}
      startDate={startDate}
    text={text}
    collectionName={collectionName}
    selectedRange={selectedRange}
    />}/>
      <Stack.Screen name='EventForm'  options={{ title: 'New Event' }} children={(props) => <EventForm {...props}
      setStartDate={setStartDate}
      startDate={startDate}
    text={text}
    onChangeText={onChangeText}/>}/>
    <Stack.Screen name='DisplayDatePicker' options={{title: 'Choose Your Dates'}} children={(props) => <DisplayDatePicker {...props} 
    setStartDate={setStartDate} 
    selectedRange={selectedRange}
    setSelectedRange={setSelectedRange}/> 
    } />
      </Stack.Navigator>
    </NavigationContainer>
      </SafeAreaView>


  );
}

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F0F0F0',
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
    color: '#3498DB',
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


