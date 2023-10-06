import { firebase } from "./database/firebase";

export const signInWithEmailAndPassword = async (email, password) => {
  const auth = firebase.auth();
  const result = await auth.signInWithEmailAndPassword(email, password);
  return result;
};

export const createUserWithEmailAndPassword = async (email, password) => {
  const auth = firebase.auth();
  const result = await auth.createUserWithEmailAndPassword(email, password);
  return result;
};