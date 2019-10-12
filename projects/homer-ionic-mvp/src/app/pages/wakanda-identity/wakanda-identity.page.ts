import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-wakanda-identity',
  templateUrl: './wakanda-identity.page.html',
  styleUrls: ['./wakanda-identity.page.scss'],
})
export class WakandaIdentityPage implements OnInit {
  _light_token: Observable<any>;
  _intent: Observable<any>;
  _national_profile: Observable<any>;
  _bank_status: Observable<any>;

  _light_token_access_token: String;
  _intent_id: String;
  _identityNumber: String;
  _national_profile_response: any;
  _bank_status_response: any;

  constructor(public apiSvc: ApiService) { }

  ngOnInit() {
    this._national_profile_response = {};
    this._bank_status_response = {};
  }

  run() {
    console.log("-- run");
    this._light_token_access_token = 'Loading...';
    this._intent_id = 'Loading...';
    console.log(`_identityNumber: ${this._identityNumber}`);
    if ((this._identityNumber === undefined) || (this._identityNumber === '')) {
      this._identityNumber = '7612140115085';
    }
    this._national_profile_response = { FirstName: 'Loading...'};
    this._bank_status_response = { partyId: 'Loading...'};

    // var _name = this.apiSvc.getName(this._identityNumber);
    // console.log(`name: ${_name}`);

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

            this._national_profile = this.apiSvc.getNationalProfile(this._light_token_access_token, this._intent_id, this._identityNumber);
            this._national_profile.subscribe(data => {
              console.log('my data: ', data);
      
              this._national_profile_response = data;
              console.log(this._national_profile_response);
            });      

            this._bank_status = this.apiSvc.getBankStatus(this._light_token_access_token, this._intent_id, this._identityNumber);
            this._bank_status.subscribe(data => {
              console.log('my data: ', data);
      
              this._bank_status_response = data;
              console.log(this._bank_status_response);
            });      

          });
      });

    // console.log(`_env: ${this._env}`);
    // console.log(`_limit: ${this._limit}`);
    // this.router.navigate([`/homer-list/${this._api}/${this._env}/${this._limit}`]);
  }


}
