import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  CLIENT_ID = 'dcda3f82-0f93-4fa6-a937-f90621c4321f';
  CLIENT_SECRET = 'W2bN5rQ1pI7mW3tQ6cH8tV3fF5uG8kK4lU8oR2pR0bL8hV6xH3';

  constructor(public httpClient: HttpClient) {
  }

  generateLightToken(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': `application/x-www-form-urlencoded`,
      }),
    };

    const _body = new HttpParams()
      .set('client_id', this.CLIENT_ID)
      .set('client_secret', this.CLIENT_SECRET)
      .set('grant_type', 'client_credentials')
      .set('scope', 'tpp_client_credential');

    return this.httpClient.post(`https://q-api.wakago.net/apimarket/live/nboauth/oauth20/token`, _body, httpOptions);
  }

  generateIntent(_accessToken): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${_accessToken}`,
        'x-fapi-financial-id': 'OB/2017/001',
        'Content-Type': 'application/json',
        'x-fapi-interaction-id': '1234543645',
        'x-ibm-client-id': this.CLIENT_ID,
        'x-ibm-client-secret': this.CLIENT_SECRET
      }),
    };

    const _body = {
      "Data": {
        "Permissions": [
          "PERFORM_ONBOARDING",
          "CUSTOMER_MANAGEMENT"

        ],
        "ExpirationDateTime": "2020-05-06T00:00:00-00:00"
      },
      "Risk": {}
    };

    return this.httpClient.post(`https://q-api.wakago.net/apimarket/live/open-banking/v1/subscriptions`, _body, httpOptions);
  }

  getNationalProfile(_accessToken: String, _intentID: String, _identityNumber: String): Observable<any> {
    console.log(`getNationalProfile(${_accessToken}, ${_intentID}, ${_identityNumber})`);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${_accessToken}`,
        'x-ibm-client-id': this.CLIENT_ID,
        'x-ibm-client-secret': this.CLIENT_SECRET,
      })
    };

    return this.httpClient.get(`https://q-api.wakago.net/apimarket/live/nb-identity/api/identity/v1/${_identityNumber}/national-profile`, httpOptions);
  }

  getBankStatus(_accessToken: String, _intentID: String, _identityNumber: String): Observable<any> {
    console.log(`getBankStatus(${_accessToken}, ${_identityNumber})`);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${_accessToken}`,
        'x-ibm-client-id': this.CLIENT_ID,
        'x-ibm-client-secret': this.CLIENT_SECRET,
      })
    };

    return this.httpClient.get(`https://q-api.wakago.net/apimarket/live/nb-identity/api/identity/v1/${_identityNumber}/nb-status`, httpOptions);
  }

}
