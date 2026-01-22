import { Profile } from "./profile";
import { VisitStatus } from "./visit-status";
import { PremiseLocation } from "./premise-location";

export interface Visitor {
    id: string;
    name: string;
    email: string;
    nationalId: string;
    phoneNumber: string;
    company: string;
    hostStaffId: string,
    purpose: string;
    vehicleNumber?: string;
    visitStatus: VisitStatus;
    checkedInAt: Date;
    checkedOutAt: Date;
    access: string;
    passNumber?: string;
    specialInstructions?: string;
}
