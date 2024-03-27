import { getFirestore, getDocs, collection } from "@firebase/firestore"
import { initializeApp } from '@firebase/app';
import firebaseConfig from '../firebase/config'


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)


//getting all docs
const colRef = collection(db, 'Activities')
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

export default dataFetch