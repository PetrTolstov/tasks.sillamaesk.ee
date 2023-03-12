import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { User, UserType } from "../../types/UserType";
import { db } from "../firebaseInit";

export default async function getUsers(role: string) {
    const q = query(collection(db, "users"), where("role", "==", role));

    const querySnapshot = await getDocs(q);
    let list: UserType[] = [];
    querySnapshot.forEach((doc) => {
        let obj = doc.data() as User;
        obj.id = doc.id;

        list.push(
            new User(
                obj.id,
                obj.firstName,
                obj.lastName,
                obj.personalCode,
                obj.email,
                obj.number,
                obj.teams,
                obj.tasks,
                obj.active,
                obj.role
            )
        );
    });

    return list;
}
