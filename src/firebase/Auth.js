import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const signUp = async(email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const login = async(email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

