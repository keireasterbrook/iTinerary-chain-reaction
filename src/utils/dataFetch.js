import { getFirestore, getDocs, collection } from "@firebase/firestore"
import { initializeApp } from '@firebase/app';
import firebaseConfig from '../firebase/firebaseConfig'
import { addDoc } from "@firebase/firestore";


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)


async function dataFetch(collectionName) {
  const colRef = collection(db, `${collectionName}`)
  const activitiesData = []
  const snapshot = await getDocs(colRef);

  snapshot.forEach(doc => {
    const activityObject = doc.data()
    activityObject.id = doc.id
    activitiesData.push(activityObject)
  
  });
  return activitiesData
}


async function dataPush({collectionName, selectedActivities}) {
  try {
    const docRefs = [];
        // Iterate over each object in the data array
        for (const activity of selectedActivities) {
            // Add a new document with the current object to the 'selectedActivities' collection
            const docRef = await addDoc(collection(db, `${collectionName}`), activity);
            console.log("Document written with ID: ", docRef.id);
            docRefs.push(docRef); // Store the reference to the added document
        }
        return docRefs; // Return an array of document references
    } catch (e) {
    console.error("Error adding document: ", e);
    throw e; // Rethrow the error for handling elsewhere if needed
}
}

export  {dataPush, dataFetch}