import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-wakanda-customers-heavy',
  templateUrl: './wakanda-customers-heavy.page.html',
  styleUrls: ['./wakanda-customers-heavy.page.scss'],
})
export class WakandaCustomersHeavyPage implements OnInit {
  _light_token: Observable<any>;
  _intent: Observable<any>;
  _heavy_token: Observable<any>;
  _party_data: Observable<any>;

  _light_token_access_token: String;
  _intent_id: String;
  _auth_code: String;
  _heavy_token_access_token: String;
  _partyID: String;
  _party_data_response: any;

  PARTY_ID_RENNAY = '110546427804';

  constructor(public apiSvc: ApiService) { }

  ngOnInit() {
  }

  run() {
    console.log("-- run");
    this._light_token_access_token = 'Loading...';
    this._intent_id = 'Loading...';
    if ((this._partyID === undefined) || (this._partyID === '')) {
      this._partyID = this.PARTY_ID_RENNAY;
    }
    console.log(`_partyID: ${this._partyID}`);
    this._auth_code = 'Loading...';
    this._heavy_token_access_token = 'Loading (up to 30 secs)...';
    this._party_data_response = { FirstName: 'Loading (up to 30 secs)...' };

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

          this._heavy_token = this.apiSvc.getHeavyToken(this._light_token_access_token, this._intent_id);
          this._heavy_token.subscribe(data => {
            console.log('my data: ', data);

            this._auth_code = data['auth_code'];
            this._heavy_token_access_token = data['heavy_token'];
            console.log(`_heavy_token_access_token: ${this._heavy_token_access_token}`);
          },
            err => {
              console.log(err);
              this._auth_code = err.message;
              this._heavy_token_access_token = err.message;
            });
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
