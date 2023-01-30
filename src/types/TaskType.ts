export type TaskType = {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    done: boolean;
    checked: boolean;
};

export class Task {
    constructor(
        id: string,
        title: string,
        description: string,
        startDate: string,
        endDate: string,
        done: boolean,
        checked: boolean
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.done = done;
        this.checked = checked;
    }
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    done: boolean;
    checked: boolean;
}
