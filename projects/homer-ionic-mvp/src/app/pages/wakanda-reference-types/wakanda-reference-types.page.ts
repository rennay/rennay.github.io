import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-wakanda-reference-types',
  templateUrl: './wakanda-reference-types.page.html',
  styleUrls: ['./wakanda-reference-types.page.scss'],
})
export class WakandaReferenceTypesPage implements OnInit {
  _light_token: Observable<any>;
  _light_token_access_token: String;

  _refdata_types_occupation: {};
  _refdata_types_income: {};
  _refdata_types_industry: {};

  constructor(public apiSvc: ApiService) { }

  ngOnInit() {
  }

  run() {
    console.log("-- run");
    this._light_token_access_token = '-';
    this._refdata_types_occupation = {};
    this._refdata_types_income = {};
    this._refdata_types_industry = {};
  }
}
