import { Injectable, signal } from '@angular/core';
import { Visitor } from '../models/visitor';

@Injectable({
  providedIn: 'root',
})
export class VisitorService {
  private visitorsData = signal(new Array<Visitor>());

  public getVisitors(): Array<Visitor> {
    return this.visitorsData();
  }
}
