import { Injectable, signal } from '@angular/core';
import { Visitor } from '../models/visitor';
import { VisitStatus } from '../models/visit-status';

@Injectable({
  providedIn: 'root',
})
export class VisitorService {
  private _visitorsData = signal(new Array<Visitor>());
  constructor() {
    this._visitorsData.update(() => new Array<Visitor>(
      {
        name: "John Doe",
        email: "john.doe@example.com",
        nationalId: "A123456789",
        phoneNumber: "+1-555-123-4567",
        company: "Acme Corp",
        hostStaff: {
          name: "Alice Johnson",
          designation: "Engineering Manager",
          department: "Engineering",
          email: "alice.johnson@company.com"
        },
        purpose: "Project discussion",
        vehicleNumber: "ABC-1234",
        status: VisitStatus.APPROVED,
        scheduledAt: new Date("2026-01-20T10:00:00"),
        checkedInAt: new Date("2026-01-20T09:55:00"),
        checkedOutAt: new Date("2026-01-20T11:30:00"),
        scheduledBy: {
          name: "Mark Lee",
          designation: "HR Executive",
          department: "Human Resources",
          email: "mark.lee@company.com"
        },
        currentLocation: {
          name: "Main Lobby",
          isRestrictedArea: false
        },
        access: "Lobby, Meeting Room 2"
      },
      {
        name: "Priya Sharma",
        email: "priya.sharma@gmail.com",
        nationalId: "IND987654321",
        phoneNumber: "+91-98765-43210",
        company: "Infosys",
        hostStaff: {
          name: "Rahul Mehta",
          designation: "Senior Architect",
          department: "IT",
          email: "rahul.mehta@company.com"
        },
        purpose: "Technical interview",
        status: VisitStatus.SCHEDULED,
        scheduledAt: new Date("2026-01-22T14:00:00"),
        checkedInAt: new Date("2026-01-22T00:00:00"),
        checkedOutAt: new Date("2026-01-22T00:00:00"),
        currentLocation: {
          name: "Reception",
          isRestrictedArea: false
        },
        access: "Reception, Interview Room"
      },
      {
        name: "Michael Brown",
        email: "michael.brown@vendors.com",
        nationalId: "US554433221",
        phoneNumber: "+1-555-987-6543",
        company: "SecureTech",
        hostStaff: {
          name: "Emily Carter",
          designation: "Facilities Manager",
          department: "Operations",
          email: "emily.carter@company.com"
        },
        purpose: "CCTV maintenance",
        vehicleNumber: "VAN-9087",
        status: VisitStatus.CHECKED_IN,
        scheduledAt: new Date("2026-01-21T08:30:00"),
        checkedInAt: new Date("2026-01-21T08:25:00"),
        checkedOutAt: new Date("2026-01-21T00:00:00"),
        currentLocation: {
          name: "Server Room Corridor",
          isRestrictedArea: true
        },
        access: "Maintenance Area"
      },
      {
        name: "Sara Kim",
        email: "sara.kim@partners.co",
        nationalId: "KR1122334455",
        phoneNumber: "+82-10-2233-4455",
        company: "Partner Solutions",
        hostStaff: {
          name: "David Park",
          designation: "Product Owner",
          department: "Product",
          email: "david.park@company.com"
        },
        purpose: "Partnership meeting",
        status: VisitStatus.CHECKED_OUT,
        scheduledAt: new Date("2026-01-18T15:00:00"),
        checkedInAt: new Date("2026-01-18T14:50:00"),
        checkedOutAt: new Date("2026-01-18T16:10:00"),
        currentLocation: {
          name: "Exit Gate",
          isRestrictedArea: false
        },
        access: "Meeting Room 5"
      },
      {
        name: "Ahmed Hassan",
        email: "ahmed.hassan@logistics.com",
        nationalId: "EG7788990011",
        phoneNumber: "+20-100-889-9001",
        company: "FastLogix",
        hostStaff: {
          name: "Nina Rodriguez",
          designation: "Supply Chain Lead",
          department: "Logistics",
          email: "nina.rodriguez@company.com"
        },
        purpose: "Delivery of hardware equipment",
        vehicleNumber: "TRK-4455",
        status: VisitStatus.PENDING,
        scheduledAt: new Date("2026-01-23T09:00:00"),
        checkedInAt: new Date("2026-01-23T00:00:00"),
        checkedOutAt: new Date("2026-01-23T00:00:00"),
        currentLocation: {
          name: "Security Gate",
          isRestrictedArea: false
        },
        access: "Loading Bay"
      }
    ));

  }
  public getVisitors(): Array<Visitor> {
    const visitors = structuredClone(this._visitorsData());
    return visitors;
  }
  public getVisitorsCount(): number {
    return this._visitorsData.length;
  }
}
