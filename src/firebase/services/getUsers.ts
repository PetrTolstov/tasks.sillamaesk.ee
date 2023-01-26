import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore/lite";
import UserStore from "../../stores/UserStore";
import { UserType } from "../../types/UserType";
import { db } from "../firebaseInit";
import { TaskType } from "../../types/TaskType";

export default async function getUsers(role: string) {
    const q = query(collection(db, "users"), where("role", "==", role));

    const querySnapshot = await getDocs(q);
    let list : UserType[]= []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list.push(doc.data() as UserType) 
      });

      return list
    
}
