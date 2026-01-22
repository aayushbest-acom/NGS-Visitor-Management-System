import { VisitStatus } from "../models/visit-status";
import { Visitor } from "../models/visitor";

export class VisitorUtils {

    public static getCheckedInVisitors(visitors: Array<Visitor>): Array<Visitor> {
        return visitors.filter((visitor) => visitor.visitStatus === VisitStatus.CHECKED_IN);
    }
    public static getVisitorsForPendingApproval(visitors: Array<Visitor>): Array<Visitor> {
        return visitors.filter((visitor) => visitor.visitStatus === VisitStatus.PENDING);
    }

}
