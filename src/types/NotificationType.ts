export type NotificationType = {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
};

export class Notification {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;

    constructor(
        id: string,
        title: string,
        description: string,
        startDate: string,
        endDate: string
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
