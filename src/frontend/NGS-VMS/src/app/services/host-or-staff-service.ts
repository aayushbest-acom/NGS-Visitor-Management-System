import { Injectable, signal } from '@angular/core';
import { Profile } from '../models/profile';
import { Actors } from '../models/actors';

@Injectable({
  providedIn: 'root',
})
export class HostOrStaffService {
  private _data = signal(new Array<Profile>());
  constructor() {
    this._data.update(() => new Array<Profile>(
      {
        id: "13d3164c-1edc-403d-b36d-ce3877e9db87",
        name: "Amit Sharma",
        designation: "Software Engineer",
        department: "Engineering",
        email: "amit.sharma@example.com",
        role: Actors.HOST
      },
      {
        id: 'd1302b42-5680-404e-92d5-7fbd7e97f15b',
        name: "Priya Verma",
        designation: "UI/UX Designer",
        department: "Design",
        email: "priya.verma@example.com",
        role: Actors.HOST

      },
      {
        id: '1a54a548-d4d4-4d1c-bc76-46c97f4a6329',
        name: "Rahul Mehta",
        designation: "Project Manager",
        department: "Product",
        email: "rahul.mehta@example.com",
        role: Actors.HOST

      },
      {
        id: '9484f2a9-f06b-4894-82b5-a68d0f08ae76',
        name: "Sneha Iyer",
        designation: "QA Engineer",
        department: "Quality Assurance",
        email: "sneha.iyer@example.com",
        role: Actors.HOST
      },
      {
        id: 'c07a0c1c-b394-4513-accc-155a42cd0509',
        name: "Vikram Patel",
        designation: "DevOps Engineer",
        department: "Infrastructure",
        email: "vikram.patel@example.com",
        role: Actors.HOST
      })
    );
  }
  public getHostOrStaffList(): Array<Profile> {
    const profile = structuredClone(this._data());
    return profile;
  }
}
