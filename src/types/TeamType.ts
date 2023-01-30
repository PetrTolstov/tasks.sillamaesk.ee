export type TeamType = {
    id: string;
    title: string;
    description: string;
    tasks: string[];
};

export class Team {
    id: string;
    title: string;
    description: string;
    tasks: string[];

    constructor(
        id: string,
        title: string,
        description: string,
        tasks: string[]
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.tasks = tasks;
    }
}
