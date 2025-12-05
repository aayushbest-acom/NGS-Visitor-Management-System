import { VisitStatus } from "../models/visit-status";
import { Visitor } from "../models/visitor";

export class VisitorUtils {

    public static getCheckedInVisitors(visitors: Array<Visitor>): Array<Visitor> {
        return visitors.filter((visitor) => visitor.status === VisitStatus.CHECKED_IN);
    }
    public static getVisitorsForPendingApproval(visitors: Array<Visitor>): Array<Visitor> {
        return visitors.filter((visitor) => visitor.status === VisitStatus.PENDING);
    }
    public static getScheduledVisitors(visitors: Array<Visitor>, scheduledDate: Date): Array<Visitor> {
        return visitors.filter((visitor) => visitor.scheduledAt === scheduledDate);
    }
}
