
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let apiUrl = 'http://localhost:3003/user/';

@Injectable()
export class AuthServiceProvider {
  constructor(public http: Http) {
  }
  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let data = JSON.stringify(credentials);
      this.http.post(apiUrl + type, data, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
}

