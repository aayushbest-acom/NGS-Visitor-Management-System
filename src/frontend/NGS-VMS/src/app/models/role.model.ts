import { Actors } from "./actors";

export interface Role {
    name: string;
    roleType: Actors;
    description: string;
    iconSrcs: Array<string>;
    routeLink: string;
}