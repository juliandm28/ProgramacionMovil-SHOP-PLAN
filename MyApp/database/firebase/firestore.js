import { FirebaseFirestore } from "firebase/firestore";
const firestore = FirebaseFirestore.getFirestore();

const user = {
  name: "John Doe",
  email: "jUAN@hotmail.com",
};

const docRef = firestore.collection("users").doc("1234567890");

docRef.get().then((doc) => {
  const user = doc.data();
  console.log(user);
});