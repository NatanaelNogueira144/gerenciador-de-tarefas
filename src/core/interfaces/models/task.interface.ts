import { IChecklist } from "./checklist.interface";

export interface ITask {
    id: number;
    name: string;
    description: string;
    startsAt?: string;
    deadline?: string;
    checklist?: IChecklist;
    isDone: boolean;
}