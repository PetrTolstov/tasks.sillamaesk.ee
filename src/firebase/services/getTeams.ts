import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebaseInit";
import { Team } from "../../types/TeamType";

export default async function getTeams() {
    const querySnapshot = await getDocs(collection(db, "teams"));
    let list: Team[] = [];
    
    querySnapshot.forEach((doc) => {
        let obj = doc.data() as Team
        obj.id = doc.id
        list.push(new Team(obj.id, obj.title, obj.description, obj.tasks));
    });
    return list
    
}
