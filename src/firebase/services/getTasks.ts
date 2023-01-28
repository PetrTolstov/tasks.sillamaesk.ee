import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../firebaseInit";
import { TaskType } from "../../types/TaskType";

export default async function getTask(id: string) {
    const ref = doc(db, "tasks", id);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        const task = docSnap.data();
        return task as TaskType;
    } else {
        return null;
    }
}
