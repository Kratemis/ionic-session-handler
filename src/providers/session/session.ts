import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionProvider {

  private authorization_code: string;
  private access_token: string;
  private url: string = "http://localhost:8080/stockcontrol/backend/web/site";
  private headers: HttpHeaders = new HttpHeaders();

  constructor(public http: HttpClient, private storage: Storage) {
    
  }

  /**
   * Register a user
   */
  register(username, password, email) {

    let customHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body = {
      "username": username,
      "password": password,
      "email": email
    };

    return this.http.post(this.url + "/register", body, { headers: customHeaders });
  }

  authorize(username, password) {

    let customHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body = {
      "username": username,
      "password": password,
    };

    return this.http.post(this.url + "/authorize", body, { headers: customHeaders });
  }

  accessToken(authorizationCode) {
    let customHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body = {
      "authorization_code": authorizationCode
    };

    return this.http.post(this.url + "/accesstoken", body, { headers: customHeaders });
  }

  hasValidIdToken(accessToken) {
    console.log("Has Valid ID Token?")
    let customHeaders = new HttpHeaders({ 'x-access-token': accessToken });
    return this.http.get(this.url + "/valid-access-token", { headers: customHeaders });
  }
}
