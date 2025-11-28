import { Component, input } from '@angular/core';

@Component({
  selector: 'app-no-data-card',
  imports: [],
  templateUrl: './no-data-card.html',
  styleUrl: './no-data-card.css',
})
export class NoDataCard {
  readonly message = input<string>();
  readonly iconSrc = input<string>();

}
