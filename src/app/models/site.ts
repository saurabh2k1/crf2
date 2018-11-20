import { User } from "./user";

export class Site {
    _id: any;
    name: string;
    code: string;
    department?: string;
    contact_person?: string;
    address: string;
    users?: User[];
}
