import firestore from '@react-native-firebase/firestore';


const dataFetch = () => {
    const activities = firestore().collection("activities");
    activities.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data())
        })
    })
};

export default dataFetch;

