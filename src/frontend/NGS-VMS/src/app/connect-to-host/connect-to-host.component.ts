import { Component, effect, input } from '@angular/core';
import { Profile } from '../models/profile';
import { Visitor } from '../models/visitor';

@Component({
  selector: 'app-connect-to-host',
  imports: [],
  templateUrl: './connect-to-host.component.html',
  styleUrl: './connect-to-host.component.css',
})
export class ConnectToHostComponent {

  hostOrStaff = input.required<Profile | null>();
  visitor = input.required<Visitor | null>();
  hostEmail = '';
  constructor() {
    effect(() => {
      if (this.visitor() && this.hostOrStaff()) {
        this.hostEmail = `mailto:${this.hostOrStaff()?.email}?&subject=Visitor:${this.visitor()?.name}%20Has%20Arrived%20At%${this.visitor()?.checkedInAt.toString()}&body=Hi%20${this.hostOrStaff()?.name},%0D%0AVisitor:${this.visitor()?.name}%0D%0APurpose:%20${this.visitor()?.purpose}%0D%0ACompany:%20${this.visitor()?.company}%0D%0ANational ID:%20${this.visitor()?.nationalId}%0D%0ASpecial Instructions:%20${this.visitor()?.specialInstructions}%0D%0AAccess Levels:%20${this.visitor()?.access}%0D%0A --System Generated Email--`;
        console.log(this.hostEmail);
      }
    });
  }
  messageHost() {
    throw new Error('Method not implemented.');
  }
  callHost() {
    throw new Error('Method not implemented.');
  }

}
