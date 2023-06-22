import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-litigation',
  templateUrl: './litigation.component.html',
  styleUrls: ['./litigation.component.scss']
})
export class LitigationComponent implements OnInit {
  serviceName = 'التقاضي';
  service = 'الخدمة غير متوفرة';
  consType = 0;
  urgent = 'عادية';
  array: any = [];

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }
}
