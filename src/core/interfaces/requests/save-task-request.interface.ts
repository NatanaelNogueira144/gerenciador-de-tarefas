import { IChecklist } from "../models/checklist.interface";

export interface ISaveTaskRequest {
    name: string;
    description: string;
    startsAt?: string;
    deadline?: string;
    checklist?: IChecklist;
    isDone: boolean;
}