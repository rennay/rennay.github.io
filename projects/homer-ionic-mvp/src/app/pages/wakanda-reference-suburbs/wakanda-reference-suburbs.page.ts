import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-wakanda-reference-suburbs',
  templateUrl: './wakanda-reference-suburbs.page.html',
  styleUrls: ['./wakanda-reference-suburbs.page.scss'],
})
export class WakandaReferenceSuburbsPage implements OnInit {
  _light_token: Observable<any>;
  _suburbList: Observable<any>;

  _queryPostalType: String;
  _querySuburb: String;

  _light_token_access_token: String;

  constructor(public apiSvc: ApiService) { }

  ngOnInit() {
    this._queryPostalType = 'str';
    this._querySuburb = 'PRETORIA';
  }

  run() {
    console.log("-- run");
    this._light_token_access_token = '-';

    this._light_token = this.apiSvc.generateLightToken();
    this._light_token
      .subscribe(data => {
        console.log('my data: ', data);

        this._light_token_access_token = data['access_token'];
        console.log(`_light_token_access_token: ${this._light_token_access_token}`);

        this._suburbList = this.apiSvc.getSuburbs(this._light_token_access_token, this._queryPostalType, this._querySuburb);
        this._suburbList.subscribe(data => {
          console.log('my data: ', data);
        });
      });
  }
}
