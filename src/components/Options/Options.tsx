import { Team } from "../../types/TeamType";
import { User } from "../../types/UserType";
import { v4 as uuid} from 'uuid'


type OptionsProps = {
    users: User[];
    teams: Team[];
};

export default function Options({ users, teams }: OptionsProps) {
    
    if (users.at(0)) {
        return (
            <>
                {users.map((user) => (
                    <option value={user.personalCode} key={uuid()}>
                        {user.firstName} {user.lastName}
                    </option>
                ))}
            </>
        );
    } else if (teams.at(0)) {
        return (
            <>
                {teams.map((team) => (
                    <option value={team.id} key={uuid()}>
                        {team.title}
                    </option>
                ))}
            </>
        );
    } else {
        
        return <></>;
    }
}
