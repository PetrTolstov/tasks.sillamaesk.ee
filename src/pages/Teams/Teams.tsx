import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import getTeam from "../../firebase/services/getTeam";
import getTeams from "../../firebase/services/getTeams";
import UserStore from "../../stores/UserStore";
import { Team, TeamType } from "../../types/TeamType";
import styles from "./teams.module.css"

function Teams() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTeam, setCurrentTeam] = useState<Team | null>(null);

    function setCurrentUserByCode(code: string) {
        const result = teams.filter((obj) => {
            return obj.id === code;
        });

        if (result && result[0]) {
            setCurrentTeam(result[0]);
        }
    }

    useEffect(() => {
        if(UserStore.userData.user){
            if (
                UserStore.userData.user?.role === "admin" ||
                UserStore.userData.user?.role === "manager"
            ) {
                getTeams().then((res) => {
                    setTeams(res);
                    setCurrentTeam(res.at(0) as TeamType);
                    setIsLoading(false);
                });
            } else {
                (async () => {
                    if(UserStore.userData.user){
                        let list : Team[] = []
                        for(let id of UserStore.userData.user.teams){
                            let item = await getTeam(id)
                            if(item){
                                list.push(new Team(id, item.title, item.description, item.tasks))
                            }
                        }
                       
                        setCurrentTeam(list[0])
                        setTeams(list)
                        setIsLoading(false)
                    }
                })()

                
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [UserStore.userData.user]);

    return (
        <main className={styles.main}>
            <nav className={styles.nav}>
                <a
                    href={"/"}
                    className={styles.link}
                >
                    Tööline
                </a>
                <a href={"/Teams"} className={[styles.link, styles.primaryLink].join(" ")}>
                    Käsk
                </a>
                <a href={"/ForAll"} className={styles.link}>
                    Kõigi jaoks
                </a>
            </nav>

            {!isLoading ? (
                <Table target={currentTeam} setCurrentTarget={(newTarget : string) => setCurrentUserByCode(newTarget)} list={teams} />
            ) : (
                <p>Loading...</p>
            )}
        </main>
    );
}


export default observer(Teams);
