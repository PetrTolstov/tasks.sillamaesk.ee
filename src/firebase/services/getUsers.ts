import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { UserType } from "../../types/UserType";
import { db } from "../firebaseInit";

export default async function getUsers(role: string) {
    const q = query(collection(db, "users"), where("role", "==", role));

    const querySnapshot = await getDocs(q);
    let list: UserType[] = [];
    querySnapshot.forEach((doc) => {
        list.push(doc.data() as UserType);
    });

    return list;
}
