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

  _refTypeQuery: String;
  _typesList: Observable<any>;

  TYPE_INCOME = 'INCOME';
  TYPE_OCCUPATION = 'OCCUPATION';
  TYPE_INDUSTRY = 'INDUSTRY';

  constructor(public apiSvc: ApiService) { }

  ngOnInit() {
    this._refTypeQuery = this.TYPE_INCOME;
  }

  run() {
    console.log("-- run");

    console.log(`_refTypeQuery: ${this._refTypeQuery}`);
    this._light_token_access_token = '-';

    this._light_token = this.apiSvc.generateLightToken();
    this._light_token
      .subscribe(data => {
        console.log('my data: ', data);

        this._light_token_access_token = data['access_token'];
        console.log(`_light_token_access_token: ${this._light_token_access_token}`);

        if (this._refTypeQuery === this.TYPE_OCCUPATION) {
          this._typesList = this.apiSvc.getOccupationTypes(this._light_token_access_token);
        }
        else if (this._refTypeQuery === this.TYPE_INDUSTRY) {
          this._typesList = this.apiSvc.getIndustryTypes(this._light_token_access_token);
        }
        else {
          this._typesList = this.apiSvc.getIncomeTypes(this._light_token_access_token);
        }
        this._typesList.subscribe(data => {
          console.log('my data: ', data);
        });
      });

  }
}
