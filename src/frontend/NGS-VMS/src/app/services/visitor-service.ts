import { computed, inject, Injectable, signal } from '@angular/core';
import { Visitor } from '../models/visitor';
import { VisitStatus } from '../models/visit-status';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Actors } from '../models/actors';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class VisitorService {
  private _visitorsData = signal(new Array<Visitor>());
  private _httpClient = inject(HttpClient);
  constructor() {
    if (environment.isDevelopment) {
      this._visitorsData.set(new Array<Visitor>(
        {
          id: crypto.randomUUID(),
          name: "John Doe",
          email: "john.doe@example.com",
          nationalId: "A123456789",
          phoneNumber: "+1-555-123-4567",
          company: "Acme Corp",
          purpose: "Project discussion",
          vehicleNumber: "ABC-1234",
          visitStatus: VisitStatus.APPROVED,
          checkedInAt: new Date("2026-01-20T09:55:00"),
          checkedOutAt: new Date("2026-01-20T11:30:00"),
          access: "Lobby, Meeting Room 2",
          hostStaffId: crypto.randomUUID()
        },
        {
          id: crypto.randomUUID(),
          name: "Priya Sharma",
          email: "priya.sharma@gmail.com",
          nationalId: "IND987654321",
          phoneNumber: "+91-98765-43210",
          company: "Infosys",
          purpose: "Technical interview",
          visitStatus: VisitStatus.SCHEDULED,
          checkedInAt: new Date("2026-01-22T00:00:00"),
          checkedOutAt: new Date("2026-01-22T00:00:00"),
          access: "Reception, Interview Room",
          hostStaffId: crypto.randomUUID()
        },
        {
          id: crypto.randomUUID(),
          name: "Michael Brown",
          email: "michael.brown@vendors.com",
          nationalId: "US554433221",
          phoneNumber: "+1-555-987-6543",
          company: "SecureTech",
          purpose: "CCTV maintenance",
          vehicleNumber: "VAN-9087",
          visitStatus: VisitStatus.CHECKED_IN,
          checkedInAt: new Date("2026-01-21T08:25:00"),
          checkedOutAt: new Date("2026-01-21T00:00:00"),
          access: "Maintenance Area",
          hostStaffId: crypto.randomUUID()
        },
        {
          id: crypto.randomUUID(),
          name: "Sara Kim",
          email: "sara.kim@partners.co",
          nationalId: "KR1122334455",
          phoneNumber: "+82-10-2233-4455",
          company: "Partner Solutions",
          purpose: "Partnership meeting",
          visitStatus: VisitStatus.CHECKED_OUT,
          checkedInAt: new Date("2026-01-18T14:50:00"),
          checkedOutAt: new Date("2026-01-18T16:10:00"),
          access: "Meeting Room 5",
          hostStaffId: crypto.randomUUID()
        },
        {
          id: crypto.randomUUID(),
          name: "Ahmed Hassan",
          email: "ahmed.hassan@logistics.com",
          nationalId: "EG7788990011",
          phoneNumber: "+20-100-889-9001",
          company: "FastLogix",
          purpose: "Delivery of hardware equipment",
          vehicleNumber: "TRK-4455",
          visitStatus: VisitStatus.PENDING,
          checkedInAt: new Date("2026-01-23T00:00:00"),
          checkedOutAt: new Date("2026-01-23T00:00:00"),
          access: "Loading Bay",
          hostStaffId: crypto.randomUUID()
        }
      ));
    } else {
      this._reloadVisitors();
    }


  }
  public getVisitors(): Array<Visitor> {

    if (environment.isDevelopment) {
      const visitors = structuredClone(this._visitorsData());
      return visitors;
    } else {
      return this._visitorsData();
    }
  }

  public getVisitorsCount(): number {
    return this._visitorsData().length;
  }

  public addVisitor(visitor: Visitor): void {
    if (environment.isDevelopment) {
      this._visitorsData().push(visitor);
    } else {
      this._httpClient.post<Visitor>(environment.httpBackendURI + environment.httpBackendVisitorCreateEndPoint, visitor).subscribe((response: Visitor) => {

        if (visitor.id === response.id) {
          console.info('Visitor Added Successfully!');
          this._reloadVisitors();

        } else {
          console.error('Visitor Addition Failed!');
        }
      });
    }
  }
  private _reloadVisitors(): void {
    this._httpClient.get<Array<Visitor>>(environment.httpBackendURI + environment.httpBackendVisitorsReadPoint).subscribe((visitors: Array<Visitor>) => {
      this._visitorsData.set(visitors);
    });
  }
}
