import { Injectable, signal } from '@angular/core';
import { PremiseLocation } from '../models/premise-location';

@Injectable({
  providedIn: 'root',
})
export class PremiseLocatonService {
  private _data = signal(new Array<PremiseLocation>());
  constructor() {
    this._data.update(() => new Array<PremiseLocation>({
      id: '328443a1-bbb0-4abb-aa42-a3f382d2a856',
      name: "Visitor Registration Area",
      isRestrictedArea: false,
    },
      {
        id: 'a3c1f259-194f-495b-8da7-e77a37136777',
        name: "Computer Science Building",
        isRestrictedArea: false,
      },
      {
        id: '71df4903-217e-41f6-9b44-7c6d9b942010',
        name: "Research Laboratory",
        isRestrictedArea: true,
      },
      {
        id: '8f440a44-6923-4315-ab94-ec073d1cf836',
        name: "Administration Office",
        isRestrictedArea: true,
      },
      {
        id: '4b3768ed-5b9e-444c-b7a2-1b818a08c028',
        name: "Student Recreation Center",
        isRestrictedArea: false,
      }));
  }
  public getDefaultPremiseLocation(): PremiseLocation {
    const defaultPremiseLocatiom = structuredClone(this._data()[0]);
    return defaultPremiseLocatiom;
  }
}
