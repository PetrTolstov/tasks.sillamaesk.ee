import { signOut } from "firebase/auth";
import { auth } from "../firebaseInit";


export default function LogOut(){
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}
