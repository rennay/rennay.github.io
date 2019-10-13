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
  _compliance_status: Observable<any>;
  _juristic_status: Observable<any>;

  _light_token_access_token: String;
  _intent_id: String;
  _auth_code: String;
  _heavy_token_access_token: String;
  _partyID: String;
  _companyPartyID: String;
  _companyRegistration: String;
  _compliance_status_response: String;
  _juristic_status_response: String;

  PARTY_ID_RENNAY = '110546427804';
  COMPANY_PARTY_ID_RENNAY = '600002685649';
  COMPANY_REGISTRATION_RENNAY = '201912080107';

  constructor(public apiSvc: ApiService) { }

  ngOnInit() {
    this._partyID = this.PARTY_ID_RENNAY;
    this._companyPartyID = this.COMPANY_PARTY_ID_RENNAY;
    this._companyRegistration = this.COMPANY_REGISTRATION_RENNAY;
  }

  run() {
    console.log("-- run");
    this._light_token_access_token = 'Loading...';
    this._intent_id = 'Loading...';
    if ((this._partyID === undefined) || (this._partyID === '')) {
      this._partyID = this.PARTY_ID_RENNAY;
    }
    if ((this._companyPartyID === undefined) || (this._companyPartyID === '')) {
      this._companyPartyID = this.COMPANY_PARTY_ID_RENNAY;
    }
    if ((this._companyRegistration === undefined) || (this._companyRegistration === '')) {
      this._companyRegistration = this.COMPANY_REGISTRATION_RENNAY;
    }
    console.log(`_partyID: ${this._partyID}`);
    this._auth_code = 'Loading (up to 30 secs)...';
    this._heavy_token_access_token = 'Loading (up to 30 secs)...';
    this._compliance_status_response = 'Loading (up to 30 secs)...';
    this._juristic_status_response = 'Loading (up to 30 secs)...';  

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

            this._compliance_status = this.apiSvc.getComplianceStatus(this._heavy_token_access_token, this._intent_id, this._partyID);
            this._compliance_status.subscribe(data => {
              console.log('my data: ', data);
  
              this._compliance_status_response = data['PartyTypeIndicator'];
              console.log(this._compliance_status_response);
            },
              err => {
                console.log(err);
                this._compliance_status_response = err.message;
              }
            );  

            this._juristic_status = this.apiSvc.getJuristicStatus(this._heavy_token_access_token, this._intent_id, this._companyPartyID, this._companyRegistration);
            this._juristic_status.subscribe(data => {
              console.log('my data: ', data);
  
              this._juristic_status_response = data['PartyTypeIndicator'];
              console.log(this._juristic_status_response);
            },
              err => {
                console.log(err);
                this._juristic_status_response = err.message;
              }
            );  
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
