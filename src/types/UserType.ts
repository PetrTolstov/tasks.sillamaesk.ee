export type UserType = {
    id: string;
    firstName: string;
    lastName: string;
    personalCode: string;
    email: string;
    number: string;
    teams: string[];
    tasks: string[];
    active: boolean;
    role: string;
};

export class User {
    id: string;
    firstName: string;
    lastName: string;
    personalCode: string;
    email: string;
    number: string;
    teams: string[];
    tasks: string[];
    active: boolean;
    constructor(
        id: string,
        firstName: string,
        lastName: string,
        personalCode: string,
        email: string,
        number: string,
        teams: string[],
        tasks: string[],
        active: boolean,
        role: string
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.personalCode = personalCode;
        this.email = email;
        this.number = number;
        this.teams = teams;
        this.tasks = tasks;
        this.active = active;
        this.role = role;
    }
    role: string;
}
