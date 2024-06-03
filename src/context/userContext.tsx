import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { signOut, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth"
import { auth } from "../app/firebase"
import { db } from "../app/firebase"
import { getDoc, setDoc, doc } from "firebase/firestore"
import { link } from "fs"
import { useRouter } from "next/router"


type UserSettings = {
    id: string,
    occupation: string,
    organization: string,
    linkedin: string,
    github: string,
}


const UserContext = createContext<{ user: User | null; userSettings: UserSettings | null; saveUserSettings: Function; } | undefined>(undefined);

export function UserContextProvider({children}: {children: ReactNode}) {
    
    const [user, setUser] = useState<User | null>(null);
    const [userSettings, setUserSettings] = useState<UserSettings | null>(null)

    function saveUserSettings(occupation: string, organization: string, linkedin: string,
        github: string,) {
        console.log(user)
        console.log(userSettings)

        if (user!=null) {
            setUserSettings({
                id: user.uid,
                occupation: occupation,
                organization: organization,
                linkedin: linkedin,
                github: github
            })
        }
    }

    useEffect(() => {
        writeUserSettings(userSettings);

    },[userSettings])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
        return unsubscribe
    }, [])

    async function findUser(user: User | null) {
        setUser(user)

        if (user !== null) {
            setUserSettings(await findUserSettings(user.uid))
        } else {
            setUserSettings(null)
        }
     }
  
    return (
        <UserContext.Provider value={{user, userSettings, saveUserSettings}}>
            {children}
        </UserContext.Provider> 
    )
}

async function findUserSettings(uid: string) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data()
        return { id: docSnap.id, occupation: data.occupation, organization: data.organization, linkedin: data.linkedin, github: data.github}

    } else {
        return null
    }
}

function writeUserSettings(userSettings: UserSettings | null | undefined) {
    if (userSettings != null) {
        setDoc(doc(db, "users", userSettings.id),{
            occupation: userSettings?.occupation,
            organization: userSettings?.organization,
            linkedin: userSettings?.linkedin,
            github: userSettings?.github
        })
    }
}

export const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
}

export const logOut = () => {
    signOut(auth)
}

export function useUserContext(){
    const context = useContext(UserContext)
    return context?.user
}

export function useUserSettingsContext() {
    const context = useContext(UserContext)
    return context?.userSettings;
}

export function useSaveUserSettingsContext() {
    const context = useContext(UserContext);
    return context?.saveUserSettings
}



