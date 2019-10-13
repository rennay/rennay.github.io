import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-wakanda-customers-light',
  templateUrl: './wakanda-customers-light.page.html',
  styleUrls: ['./wakanda-customers-light.page.scss'],
})
export class WakandaCustomersLightPage implements OnInit {
  _light_token: Observable<any>;
  _intent: Observable<any>;
  _party_data: Observable<any>;

  _light_token_access_token: String;
  _intent_id: String;
  _partyID: String;
  _party_data_response: String;

  PARTY_ID_RENNAY = '110546427804';

  constructor(public apiSvc: ApiService) { }

  ngOnInit() {
    this._partyID = this.PARTY_ID_RENNAY;
  }

  run() {
    console.log("-- run");
    this._light_token_access_token = 'Loading...';
    this._intent_id = 'Loading...';
    if ((this._partyID === undefined) || (this._partyID === '')) {
      this._partyID = this.PARTY_ID_RENNAY;
    }
    console.log(`_partyID: ${this._partyID}`);
    this._party_data_response = 'Loading...';

    this._light_token = this.apiSvc.generateLightToken();
    this._light_token
      .subscribe(data => {
        console.log('my data: ', data);

        this._light_token_access_token = data['access_token'];
        console.log(`_light_token_access_token: ${this._light_token_access_token}`);

        this._intent = this.apiSvc.generateIntent(this._light_token_access_token);
        this._intent.subscribe(data => {
            console.log('my data: ', data);

            this._intent_id = data['Data']['subscription_id'];
            console.log(`_subscription_id: ${this._intent_id}`);

            this._party_data = this.apiSvc.getPartyData(this._light_token_access_token, this._intent_id, this._partyID);
            this._party_data.subscribe(data => {
              console.log('my data: ', data);
      
              this._party_data_response = data['FirstName'];
              console.log(this._party_data_response);
            },
              err => {
                console.log(err);
                this._party_data_response = err.message;
              }
            );      
        },
          err => {
            console.log(err);
            this._intent_id = err.message;
          }  
        );
      },
        err => {
          console.log(err);
          this._light_token_access_token = err.message;
        }  
      );
    }
}
