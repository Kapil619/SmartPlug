import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";

export const signIn = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error) {
        console.error(error);
    }
}

export const signUp = async (email: string, password: string) => {
    try {
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error) {
        console.error(error);
    }
}
export const logOut = async () => {
    try {
        await signOut(FIREBASE_AUTH);
    } catch (error) {
        console.error(error);
    }
}

export const AuthChanged = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(FIREBASE_AUTH, callback);
}



