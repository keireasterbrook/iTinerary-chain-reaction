import { getFirestore, getDocs, collection } from "@firebase/firestore"
import { initializeApp } from '@firebase/app';
import firebaseConfig from '../firebase/config'
import { addDoc } from "@firebase/firestore";


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)


//getting all docs
const colRef = collection(db, 'selectedActivities')

async function dataFetch() {
  const activitiesData = []
  const snapshot = await getDocs(colRef);

  snapshot.forEach(doc => {
    // console.log(doc.id, '=>', doc.data())
    const activityObject = doc.data()
    activityObject.id = doc.id
    activitiesData.push(activityObject)
  
  });
  return activitiesData
}


async function dataPush(data) {
  try {
    const docRefs = [];
        // Iterate over each object in the data array
        for (const activity of data) {
            // Add a new document with the current object to the 'selectedActivities' collection
            const docRef = await addDoc(collection(db, 'selectedActivities'), activity);
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