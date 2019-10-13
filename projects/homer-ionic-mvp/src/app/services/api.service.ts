import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  CLIENT_ID = 'dcda3f82-0f93-4fa6-a937-f90621c4321f';
  CLIENT_SECRET = 'W2bN5rQ1pI7mW3tQ6cH8tV3fF5uG8kK4lU8oR2pR0bL8hV6xH3';

  CLIENT_ID_CUSTOMERS = 'bb748243-5c02-46dc-86a6-175e91144f73';
  CLIENT_SECRET_CUSTOMERS = 'R4vL6aN4tW2uE6lR3eQ2wH0bX7qO8eU4bV7oO8hR4iN5mD0lF0';

  constructor(public httpClient: HttpClient) {
  }

  generateLightToken(): Observable<any> {
    console.log(`generateLightToken()`);
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

    return this.internalGETCall(_accessToken, `https://q-api.wakago.net/apimarket/live/nb-identity/api/identity/v1/${_identityNumber}/national-profile`);
  }

  getBankStatus(_accessToken: String, _intentID: String, _identityNumber: String): Observable<any> {
    console.log(`getBankStatus(${_accessToken}, ${_identityNumber})`);

    return this.internalGETCall(_accessToken, `https://q-api.wakago.net/apimarket/live/nb-identity/api/identity/v1/${_identityNumber}/nb-status`);
  }

  getOccupationTypes(_accessToken: String): Observable<any> {
    console.log(`getOccupationTypes(${_accessToken})`);

    return this.internalGETCall(_accessToken, 'https://q-api.wakago.net/apimarket/live/nb-ref-data/api/nb-ref-data/v1/occupation-types');
  }

  getIndustryTypes(_accessToken: String): Observable<any> {
    console.log(`getIndustryTypes(${_accessToken})`);

    return this.internalGETCall(_accessToken, 'https://q-api.wakago.net/apimarket/live/nb-ref-data/api/nb-ref-data/v1/industry-types');
  }

  getIncomeTypes(_accessToken: String): Observable<any> {
    console.log(`getIncomeTypes(${_accessToken})`);

    return this.internalGETCall(_accessToken, 'https://q-api.wakago.net/apimarket/live/nb-ref-data/api/nb-ref-data/v1/income-types');
  }

  getSuburbs(_accessToken: String, _postalType: String, _suburb: String): Observable<any> {
    console.log(`getSuburbs(${_accessToken}, ${_postalType}, ${_suburb})`);

    return this.internalGETCall(_accessToken, `https://q-api.wakago.net/apimarket/live/nb-ref-data/api/nb-ref-data/v1/suburbs?postaltype=${_postalType}&suburb=${_suburb}`);
  }

  getPartyData(_accessToken: String, _intentID: String, _partyID: String): Observable<any> {
    console.log(`getPartyData(${_accessToken}, ${_intentID}, ${_partyID})`);

    return this.internalGETCallCustomers(_accessToken, `https://q-api.wakago.net/apimarket/live/bus/customers/${_partyID}`);
  }

  getHeavyToken(_accessToken: String, _intentID: String): Observable<any> {
    console.log(`getHeavyToken(${_accessToken}, ${_intentID})`);

    return this.internalGETCall(_accessToken, `http://156.38.0.145:4000/homer/subscriptions/live/token?subscription_id=${_intentID}`);
  }

  getComplianceStatus(_accessToken: String, _intentID: String, _partyID: String): Observable<any> {
    console.log(`getComplianceStatus(${_accessToken}, ${_intentID}, ${_partyID})`);

    return this.internalGETCallCustomers(_accessToken, `https://q-api.wakago.net/apimarket/live/bus/customers/${_partyID}/compliance-status`);
  }

  getJuristicStatus(_accessToken: String, _intentID: String, _companyPartyID: String, _companyRegistration: String): Observable<any> {
    console.log(`getComplianceStatus(${_accessToken}, ${_intentID}, ${_companyPartyID}, ${_companyRegistration})`);

    return this.internalGETCallCustomers(_accessToken, `https://q-api.wakago.net/apimarket/live/bus/customers/${_companyPartyID}/juristic-status?company-registration=${_companyRegistration}`);
  }

  internalGETCall(_accessToken: String, _url): Observable<any> {
    console.log(`internalGETCall(${_accessToken})`);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${_accessToken}`,
        'x-ibm-client-id': this.CLIENT_ID,
        'x-ibm-client-secret': this.CLIENT_SECRET
      })
    };

    return this.httpClient.get(_url, httpOptions);
  }

  internalGETCallCustomers(_accessToken: String, _url): Observable<any> {
    console.log(`internalGETCall(${_accessToken})`);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${_accessToken}`,
        'x-ibm-client-id': this.CLIENT_ID_CUSTOMERS,
        'x-ibm-client-secret': this.CLIENT_SECRET_CUSTOMERS,
      })
    };

    return this.httpClient.get(_url, httpOptions);
  }

}
