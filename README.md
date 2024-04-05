iTinerary

A travel planning app brought to you by the Chain Reaction project group.

Ahmed Hussain (https://github.com/Ahuss98 / https://www.linkedin.com/in/ahmed-hussain-122b33271/)
Alice Wilson (https://github.com/alicewilson17)
Jaswinder Bhogal (https://github.com/JazzyCoding96)
Keir Easterbrook (https://github.com/keireasterbrook / https://www.linkedin.com/in/keir-easterbrook-00ba84211/)
Megan Clayton-Clarke (https://github.com/megclaycla)

Planning a holiday can be stressful, and with so many options of tours, activities and restaurants, sometimes it can be hard to plan which activities you’d like to do on each day of your trip.

This is where iTinerary comes in. iTinerary is your own personal travel agent that aims to take the hassle out of holiday planning. It uses a smart TravelBot which creates a customised list of recommendations for things to do and places to eat at your holiday destination, based on your personal preferences. You can then browse through this list and select the activities that you’re interested in, and iTinerary will create a bespoke schedule for you. That way, you can spend less time researching and planning your holiday, and more time getting excited for the trip of a lifetime!

The project is a part of Northcoders Software Development Bootcamp, and is our final project phase assignment, we were given a lot of freedom to explore new technologies and build an app in a way we felt necessary, and challenging!

This project uses these technologies -
React Native, 
Javascript, 
Firebase, 
Firestore, 
Expo, 
Axios, 
and the Mapbox API.

In order to use the app fully, and use the powerful Maxbox API, you will need to insert your personal access token.

Instructions on how to create one can be found here - https://docs.mapbox.com/help/getting-started/access-tokens/
With this cloned locally, you can add the key to the commented out variable 'searchBox_API_KEY' in the ActiviesList.jsx file. The variable is on line 12, you will need to comment out the import of our key on line 10, also.

Similarly, our firebase config is also on our gitignore, your firebase configuration can be created in the src/firebase folder, under the file name firebaseConfig.js and will be routed correctly through the app. It just requires the config object provided when initialising a firebase project.

To begin the project, run npm install and then use either npm start, or npx expo start.

For the best experience, we recommend launching the project on an iOS emulator, as this is a primarily iOS application.