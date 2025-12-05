import { Component, input, Signal } from '@angular/core';
import { Visitor } from '../models/visitor';

@Component({
  selector: 'app-visitor-activity-card',
  imports: [],
  templateUrl: './visitor-activity-card.html',
  styleUrl: './visitor-activity-card.css',
})
export class VisitorActivityCard {

  visitor = input<Visitor>();
}
