import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PassportReaderScanResult } from '../models/passport-reader-scan-result';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PassportReaderService {

  private _httpClient = inject(HttpClient);

  public getPassportNumber(): Observable<PassportReaderScanResult> {
    return this._httpClient.get<PassportReaderScanResult>(environment.httpBackendURI + environment.httpBackendPassportReadEndpoint);
  }

}
