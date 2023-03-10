import { addDoc, collection, Timestamp } from "firebase/firestore/lite";
import { db } from "../firebase/firebaseInit";

export type ArchiveArgs = {
    description: string;
    title: string;
    endDate: string;
    startDate: string;
};

export default function AddToArchive({
    title,
    description,
    startDate,
    endDate,
}: ArchiveArgs) {
    let end = endDate.split('/')
    let start = startDate.split('/')
    addDoc(collection(db, "archive"), {
        description: description,
        endDate: Timestamp.fromDate(new Date(`${end[1]}/${end[0]}/${end[2]}`)),
        startDate: Timestamp.fromDate(new Date(`${start[1]}/${start[0]}/${start[2]}`)),
        title: title,
    });
}
