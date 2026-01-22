import { Actors } from "./actors";

export interface Profile {
    id: string;
    name: string;
    designation: string;
    department: string;
    email: string;
    phone: string;
    role: Actors;
}
