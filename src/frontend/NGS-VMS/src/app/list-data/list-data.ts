import { Component } from '@angular/core';

@Component({
  selector: 'app-list-data',
  imports: [],
  templateUrl: './list-data.html',
  styleUrl: './list-data.css',
})
export class ListData {
  listDataheading: string = "List Data Heading";
  listCount: number = 0;
  listIconNoDataAltText: string = "List Data No Data Img Alt Text";
  listNoDataMessage: string = "List Data No Data Message";
}
