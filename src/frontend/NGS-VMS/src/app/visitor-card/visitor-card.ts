import { Component, input } from '@angular/core';
import { Visitor } from '../models/visitor';
import { VisitStatus } from '../models/visit-status';

@Component({
  selector: 'app-visitor-card',
  imports: [],
  templateUrl: './visitor-card.html',
  styleUrl: './visitor-card.css',
})
export class VisitorCard {
  visitor = input<Visitor>();
  readonly VISITOR_STATUS_PENDING = VisitStatus.PENDING;
}
