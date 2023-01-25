import { collection, getDocs } from "firebase/firestore/lite"
import { db } from "../firebaseInit"

export default async function getTasks(){
    const tasks = collection(db, 'tasks')
    const taskSnapshot = await getDocs(tasks)
    const tasksList = taskSnapshot.docs.map(doc => doc.data());
    return tasksList;
}

