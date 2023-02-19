import { Team } from './../../types/TeamType';
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../firebaseInit";


export default async function getTeams(id: string) {
    const ref = doc(db, "teams", id);

    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        const team = docSnap.data();
        return team as Team;
    } else {
        return null;
    }
    
}
