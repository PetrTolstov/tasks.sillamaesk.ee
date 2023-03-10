import { getDocs, collection, orderBy, query } from "firebase/firestore/lite";
import { Notification } from "../../types/NotificationType";
import { Team } from "../../types/TeamType";
import { db } from "../firebaseInit";

export default async function getNotifications() {
    const q = query(collection(db, "notifications"), orderBy("endDate", "desc"));
    const querySnapshot = await getDocs(q);
    let list: Notification[] = [];

    querySnapshot.forEach((doc) => {
        let obj = doc.data();
        obj.id = doc.id;
        list.push(
            new Notification(
                obj.id,
                obj.title,
                obj.description,
                obj.startDate.toDate().toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'numeric', year: 'numeric'
                  }),
                obj.endDate.toDate().toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'numeric', year: 'numeric'
                  })
            )
        );
    });
    return list;
}
