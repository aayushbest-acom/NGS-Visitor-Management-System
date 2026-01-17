import { HttpBackend, HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _httpClient = inject(HttpClient);
  public sayHelloToBackend(){

  }
}
