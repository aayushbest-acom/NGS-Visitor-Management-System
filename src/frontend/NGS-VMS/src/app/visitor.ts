import { Profile } from "./profile";
import { VisitStatus } from "./visit-status";

export interface Visitor {
    name: string;
    email: string;
    nationalId: string;
    phoneNumber: string;
    company: string;
    hostStaff: Profile;
    purpose: string;
    vehicleNumber?: string;
    status: VisitStatus;
    scheduledAt: Date;
    checkedInAt: Date;
    checkedOutAt: Date;
    scheduledBy?: Profile;
}
