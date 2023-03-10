import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebaseInit";
import { doc, getDoc } from "firebase/firestore/lite";
import { UserType } from "../../types/UserType";
import UserStore from "../../stores/UserStore";

export default function CheckIfUserSignIn() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const ref = doc(db, "users", user.uid as string);
            console.log(user.uid)
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                let userInfo = docSnap.data();
                userInfo.id = user.uid
                UserStore.setUserData(userInfo as UserType)
            } else {
                localStorage.setItem("isLoggedIn", '')
            }

          
            
        } else {
            localStorage.setItem("isLoggedIn", '')
        }
    });
}
