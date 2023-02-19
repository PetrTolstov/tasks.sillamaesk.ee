import { getDocs, collection } from "firebase/firestore/lite";
import { Notification } from "../../types/NotificationType";
import { Team } from "../../types/TeamType";
import { db } from "../firebaseInit";

export default async function getNotifications() {
    const querySnapshot = await getDocs(collection(db, "notifications"));
    let list: Notification[] = [];

    querySnapshot.forEach((doc) => {
        let obj = doc.data() as Notification;
        obj.id = doc.id;
        list.push(
            new Notification(
                obj.id,
                obj.title,
                obj.description,
                obj.startDate,
                obj.endDate
            )
        );
    });
    return list;
}
