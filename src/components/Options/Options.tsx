import { Team } from "../../types/TeamType";
import { User } from "../../types/UserType";

type OptionsProps = {
    users: User[];
    teams: Team[];
};

export default function Options({ users, teams }: OptionsProps) {
    
    if (users.length !== 0) {
        console.log(teams)
        return (
            <>
                {users.map((user) => (
                    <option value={user.personalCode} key={user.email}>
                        {user.firstName} {user.lastName}
                    </option>
                ))}
            </>
        );
    } else if (teams.length !== 0) {
        
        return (
            <>
                {teams.map((team) => (
                    <option value={team.id} key={team.id}>
                        {team.title}
                    </option>
                ))}
            </>
        );
    } else {
        
        return <></>;
    }
}
