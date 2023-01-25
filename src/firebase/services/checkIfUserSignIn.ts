import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebaseInit";
import { collection, doc, getDoc } from "firebase/firestore/lite";
import { UserType } from "../../types/UserType";
import UserStore from "../../stores/UserStore";

export default function CheckIfUserSignIn() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log(user);
            const ref = doc(db, "users", user.email as string);
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                let userInfo = docSnap.data();
                userInfo.id = user.email
                UserStore.setUserData(userInfo as UserType)
            } else {
                console.log("No such document!");
            }

          
            
        } else {
            // User is signed out
            // ...
        }
    });
}
