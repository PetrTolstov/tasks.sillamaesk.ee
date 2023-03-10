import { doc, getDoc, Timestamp } from "firebase/firestore/lite";
import { db } from "../firebaseInit";
import { Task } from '../../types/TaskType';

export default async function getTask(id: string) {
    const ref = doc(db, "tasks", id);

    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        let task = docSnap.data();
        task.startDate = task.startDate.toDate().toLocaleDateString('en-GB', {
            day: 'numeric', month: 'numeric', year: 'numeric'
          })
        task.endDate = task.endDate.toDate().toLocaleDateString('en-GB', {
            day: 'numeric', month: 'numeric', year: 'numeric'
          })
        return task as Task;
    } else {
        return null;
    }
}
