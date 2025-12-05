import { AuditLogModel } from "../models/audit-log-model";
import { Profile } from "../models/profile";
import { Visitor } from "../models/visitor";

export class AuditLogFactory {

    static logEventLogin(profile: Profile): AuditLogModel | any {

    }

    static logEventLogout(profile: Profile): AuditLogModel | any {

    }

    static logEventCheckIn(profile: Profile, visitor: Visitor): AuditLogModel | any {

    }

    static logEventCheckOut(profile: Profile, visitor: Visitor): AuditLogModel | any {

    }

    static logEventRegister(profile: Profile, visitor: Visitor): AuditLogModel | any {

    }

    static logEventApproval(profile: Profile, visitor: Visitor): AuditLogModel | any {

    }

    static logEventBadgeIssue(profile: Profile, visitor: Visitor): AuditLogModel | any {

    }
}
