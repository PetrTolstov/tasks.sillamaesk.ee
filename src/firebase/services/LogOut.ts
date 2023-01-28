import { signOut } from "firebase/auth";
import { auth } from "../firebaseInit";

export default function LogOut() {
    signOut(auth).catch((error) => {
        console.log(error);
    });
}
