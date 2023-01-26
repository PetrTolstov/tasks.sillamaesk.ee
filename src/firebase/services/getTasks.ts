import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite"
import UserStore from "../../stores/UserStore";
import { UserType } from "../../types/UserType";
import { db } from "../firebaseInit"
import { TaskType } from '../../types/TaskType';

export default async function getTask(id : string){
    const ref = doc(db, "tasks", id);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        const task = docSnap.data();
        return task as TaskType;
    } else {
        console.log("No such document!");
        console.log(id)
        return null
    }

   
}

