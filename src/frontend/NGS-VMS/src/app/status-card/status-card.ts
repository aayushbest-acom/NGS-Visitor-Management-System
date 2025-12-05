import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status-card',
  imports: [],
  templateUrl: './status-card.html',
  styleUrl: './status-card.css',
})
export class StatusCard {
  iconDesc = input<string>();
  iconUri = input<string>();
  count = input<string>();
  message = input<string>();
  backgroundColor = input<string>();
  messageColor = input<string>();
  infoColor = input<string>();
}
