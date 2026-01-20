import { Component, inject, model, signal } from '@angular/core';
import { BottomNavigator } from "../bottom-navigator/bottom-navigator";
import { NoDataCard } from "../no-data-card/no-data-card";
import { FormsModule } from '@angular/forms';
import { HeadLogo } from "../head-logo/head-logo";
import { VisitStatus } from '../models/visit-status';
import { Visitor } from '../models/visitor';
import { VisitorService } from '../services/visitor-service';
import { VisitorCard } from "../visitor-card/visitor-card";

@Component({
  selector: 'app-visitor-list',
  imports: [FormsModule, BottomNavigator, HeadLogo, NoDataCard, VisitorCard],
  templateUrl: './visitor-list.html',
  styleUrl: './visitor-list.css',
  providers: []
})
export class VisitorList {
  readonly currentFilter = signal('');
  readonly searchTerm = model("");
  readonly visitStatus = signal<string[]>(Object.values(VisitStatus));
  readonly visitors = signal(new Array<Visitor>());
  readonly visitorService = inject(VisitorService);
  constructor() {
    this.visitors.set(this.visitorService.getVisitors());
  }

  searchVisitor($event: KeyboardEvent) {
    this.visitors.update(() => this.visitorService.getVisitors().filter((visitor: Visitor) => visitor.name.includes(this.searchTerm()) || visitor.nationalId.includes(this.searchTerm())));
  }

  filterVisitorsByStatus(statusType: string) {
    this.currentFilter.set(statusType);
    this.visitors.update(() => this.visitorService.getVisitors().filter((visitor: Visitor) => visitor.status === statusType));
  }

}
