import { signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { writable, get } from "svelte/store";
import { auth } from "$lib/firebase/firebase.client";
import { db } from "$lib/firebase/firebase.client";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { type Settings } from "./settingsStore";


// a debounce function that only triggers on the trailing edge
const debounce = (func: Function, timeout = 300) => {
    // @ts-ignore
    let timer;
    // @ts-ignore
    return (...args) => {
        // @ts-ignore
        clearTimeout(timer);
        timer = setTimeout(() => {
            // @ts-ignore
            func.apply(this, args);
        }, timeout);
    };
};

async function publishToFirestore() {
    const user = get(firebaseStore).currentUser;
    const data = get(firebaseStore).data;

    if (!user || !data) return;
    try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, data)
        //await setDoc(userRef, data, { merge: true });
        console.log("Save successful!", data);
        firebaseStore.update((curr) => {
            curr.savingStatus = "saved";
            return curr
        });
    } catch (err) {
        console.log("There was an error saving data!", err);
        firebaseStore.update((curr) => {
            curr.savingStatus = "error";
            return curr
        });
    } finally {
        
    }
}
const debouced_publishToFirestore = debounce(publishToFirestore, 2000);

export type UserData = {
    tabs: Record<string, string>,
    activeIndex: number,
    settings: Settings
}

export const firebaseStore = writable({
    savingStatus: undefined as "saving" | "saved" | "error" | undefined,
    isLoading: true,
    currentUser: <User | null>null,
    data: <UserData | null>null
})

export const firebaseHandlers = {
    login: async (email: string, password: string) => {
        // call firebase sign in function
        await signInWithEmailAndPassword(auth, email, password)
    },
    logout: async () => {
        // call firebase logout function
        await signOut(auth)
    },
    publish: ()=> {
        firebaseStore.update((curr) => {
            curr.savingStatus = "saving";
            return curr
        });
        debouced_publishToFirestore();
    }
}