import { User } from './user';
import { Study } from './study';

export class Site {
    id: string;
    _id: any;
    name: string;
    code: string;
    department?: string;
    contact_person?: string;
    address: string;
    users?: User[];
    studies?: Study[];
}
