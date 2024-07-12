import { signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { writable, get } from "svelte/store";
import { auth } from "$lib/firebase/firebase.client";
import { db } from "$lib/firebase/firebase.client";
import { doc, getDocs, collection, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { type PackedTabs, tabsHandlers, metadataStore } from "$lib/stores/tabsStore";
import { type Settings, settingsStore } from "$lib/stores/settingsStore";


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
    const packedTabs = tabsHandlers.packTabs();
    const userData: UserData = {
        activeIndex: get(metadataStore).activeIndex,
        order: get(metadataStore).order,
        settings: get(settingsStore),
    };

    if (!user || !userData || !packedTabs) {
        console.warn("User not signed in or no data to save!");
        return;
    }

    try {
        // update user data
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, userData)

        // update tabs data
        const tabsCollection = collection(userRef, "tabs");
        Object.entries(packedTabs).forEach(async ([key, value]) => {
            await setDoc(doc(tabsCollection, key), value)
        });
        //TODO: delete old tabs from firestore

        firebaseStore.update(curr => ({ ...curr, savingStatus: "saved" }));
    } catch (err) {
        console.warn("There was an error saving data!", err);
        firebaseStore.update(curr => ({ ...curr, savingStatus: "error" }));
    }
}
const debouced_publishToFirestore = debounce(publishToFirestore, 2000);

export type UserData = {
    activeIndex: number,
    order: string[],
    settings: Settings
}

export const firebaseStore = writable({
    isLoading: false,
    savingStatus: undefined as "saving" | "saved" | "error" | undefined,
    currentUser: <User | null>null
})

export const firebaseHandlers = {
    login: async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password)
    },
    logout: async () => { await signOut(auth) },
    publish: () => {
        firebaseStore.update((curr) => {
            curr.savingStatus = "saving";
            return curr
        });
        debouced_publishToFirestore();
    },
    forcePublish: () => {
        firebaseStore.update((curr) => {
            curr.savingStatus = "saving";
            return curr
        });
        publishToFirestore();
    }
}