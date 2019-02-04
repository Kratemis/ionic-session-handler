import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ArticleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArticleProvider {

  public url: string = "http://localhost:8080/stockcontrol/backend/web/article";
  public headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'text/javascript'
  });

  constructor(public http: HttpClient) {
    console.log('Hello ArticleProvider Provider');
  }

  /**
   * Create an article
   */
  create() {
    console.log("Requesting Questions");
    return this.http.get(this.url + "/create");
  }

  /**
   * List all articles
   */
  list(accessToken) {
    console.log("Requesting Questions");
    let customHeaders = new HttpHeaders({ 'x-access-token': accessToken });

    return this.http.get(this.url + "?limit=1000", { headers: customHeaders });
  }

  /**
   * Read or view an article
   */
  view(id) {
    console.log("Requesting Questions");
    return this.http.get(this.url + "/view/" + id);
  }

  /**
   * Update an article
   */
  update(id) {
    console.log("Requesting Questions");
    return this.http.get(this.url + "/update/" + id);
  }

  /**
   * Delete an article
   */
  delete(id) {
    console.log("Requesting Questions");
    return this.http.get(this.url + "/delete/" + id);
  }

}
