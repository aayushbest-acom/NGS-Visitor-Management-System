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
    status: VisitStatus;
    scheduledAt: Date;
    checkedInAt: Date;
    checkedOutAt: Date;
    scheduledById?: string,
    currentLocationId: string,
    access: string;
}
