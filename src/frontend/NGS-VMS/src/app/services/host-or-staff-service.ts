import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../models/profile';
import { Actors } from '../models/actors';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HostOrStaffService {
  private _data = signal(new Array<Profile>());
  private _httpClient = inject(HttpClient);

  constructor() {
    this._httpClient.get<Array<Profile>>(environment.httpBackendURI + environment.httpBackendHostsReadEndPoint)
      .subscribe((hostOrStaffs: Array<Profile>) => {
        this._data.set(hostOrStaffs);
      });
  }
  public getHostOrStaffList(): Array<Profile> {
    return this._data();
  }
}
