import { signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { writable, get } from "svelte/store";
import { auth } from "$lib/firebase/firebase.client";
import { db } from "$lib/firebase/firebase.client";
import { doc, collection, updateDoc, setDoc, getDoc } from "firebase/firestore";
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
// a debounce function that only triggers on the leading edge
function debounce_leading(func: Function, timeout = 300) {
    // @ts-ignore
    let timer;
    // @ts-ignore
    return (...args) => {
        // @ts-ignore
        if (!timer) {
            // @ts-ignore
            func.apply(this, args);
        }
        // @ts-ignore
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = undefined;
        }, timeout);
    };
}

async function loadFromFirestore() {
    const user = get(firebaseStore).currentUser;
    if (!user) return;
    firebaseStore.update((curr) => ({ ...curr, isLoading: true }));


    // get firestore document data
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    let userDataToSetStoreTo: UserData = {
        activeIndex: 0,
        order: [],
        settings: { theme: "Canvas", spellCheck: true },
    };
    let packedTabsToSetStoreTo: PackedTabs = {};

    // create a new user doc if it doesn't exist
    if (!userSnap.exists()) {
        console.log("Creating firestore user doc...");
        const userRef = doc(db, "users", user.uid);
        try {
            await setDoc(userRef, userDataToSetStoreTo, { merge: true });
        } catch (err) {
            console.warn("There was an error creating the user doc!", err);
        }
    }
    // otherwise, fetch the user doc
    else {
        console.log("Fetching firestore user doc...");
        const userData = userSnap.data();
        userDataToSetStoreTo = { ...userDataToSetStoreTo, ...userData };

        for (let i = 0; i < userDataToSetStoreTo.order.length; i++) {
            const tabID = userDataToSetStoreTo.order[i];
            try {
                const tabSnap = await getDoc(doc(userRef, "tabs", tabID));
                if (!tabSnap.exists()) {
                    userDataToSetStoreTo.order.splice(i, 1);
                    i--;
                    continue;
                }
                packedTabsToSetStoreTo[tabID] = tabSnap.data() as PackedTabs[0];
            } catch (err) {
                console.warn("There was an error fetching the tab doc!", err);
                userDataToSetStoreTo.order.splice(i, 1);
                i--;
            }

        }
    }

    // save user data to tabsStore and settingsStore
    tabsHandlers.loadPackedTabs(packedTabsToSetStoreTo);
    metadataStore.update(curr => ({ ...curr, order: userDataToSetStoreTo.order }));
    tabsHandlers.setActiveIndex(userDataToSetStoreTo.activeIndex);
    settingsStore.set(userDataToSetStoreTo.settings);
    firebaseStore.update((curr) => ({ ...curr, isLoading: false }));

}
const debouced_leading_loadFromFirestore = debounce_leading(loadFromFirestore, 2000);

async function publishToFirestore() {
    console.log("Publishing data to firestore...");
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
    isLoading: true,
    savingStatus: undefined as "saving" | "saved" | "error" | undefined,
    currentUser: <User | null>null
})

export const firebaseHandlers = {
    login: async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password)
    },
    logout: async () => { await signOut(auth) },
    publishToFirestore: () => {
        if (get(firebaseStore).isLoading) return;
        firebaseStore.update((curr) => ({ ...curr, savingStatus: "saving" }));
        debouced_publishToFirestore()
    },
    loadFromFirestore: () => {
        if (get(firebaseStore).savingStatus === "saving") return;
        debouced_leading_loadFromFirestore();
    }
}