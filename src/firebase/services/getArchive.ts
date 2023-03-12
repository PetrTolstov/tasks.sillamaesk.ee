import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { db } from "../firebaseInit";
import { Task } from "../../types/TaskType";
import { ArchiveArgs } from "../../services/AddToArchive";

export default async function getArchive() {
    const querySnapshot = await getDocs(collection(db, "archive"));
    let list: ArchiveArgs[] = [];

    querySnapshot.forEach((doc) => {
        let obj = doc.data();
        obj.startDate = obj.startDate.toDate().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
        });
        obj.endDate = obj.endDate.toDate().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
        });
        list.push(obj as ArchiveArgs);
    });
    return list;
}
