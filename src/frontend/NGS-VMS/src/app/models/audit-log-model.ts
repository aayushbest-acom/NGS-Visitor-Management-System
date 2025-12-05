import { LogType } from "./log-type";
import { Profile } from "./profile";
import { Visitor } from "./visitor";

export interface AuditLogModel {
    id: bigint;
    timestamp: Date;
    kind: LogType;
    actor: Profile;
    target: Visitor;
    actions: string[];
}
