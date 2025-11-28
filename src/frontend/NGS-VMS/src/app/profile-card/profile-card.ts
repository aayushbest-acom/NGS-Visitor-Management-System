import { Component, computed, input } from '@angular/core';
import { Profile } from '../profile';

@Component({
  selector: 'app-profile-card',
  imports: [],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.css',
})
export class ProfileCard {
  profile = input<Profile>();
  readonly name = computed(() => this.profile()?.name);
  readonly designation = computed(() => this.profile()?.designation);
  readonly department = computed(() => this.profile()?.department);
  readonly wish = this.getWish();
  constructor() {

  }
  private getWish(): string {
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    } else if (currentHour >= 18 && currentHour <= 23) {
      return "Good Evening";
    }
    return "Good Night";
  }
}
