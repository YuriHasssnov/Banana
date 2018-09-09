import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserdetailPage } from '../userdetail/userdetail';

/**
 * Generated class for the UserlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userlist',
  templateUrl: 'userlist.html',
})
export class UserlistPage {

  /**
    * @name users
    * @type {Array}
    * @public
    * @description              Used to store the retrieved documents from the
                                MongoDB database
    */
  public users: Array<any>;


  /**
   * @name _HOST
   * @type {String}
   * @private
   * @description              The network IP Address and port number that the
                               node application is running on
   */
  private _HOST: string = "http://localhost:3003/";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _HTTP: HttpClient) {
  }

  ionViewDidLoad(): void {
    this.retrieve();
  }

  retrieve() {
    this._HTTP.get(this._HOST + "user/getusers")
      .subscribe((data: any) => {
        console.log(data)
        this.users = data.data.docs;
      },
        (error: any) => {
          console.dir(error);
        });
  }

  userSelected(id) {
    console.log("userID: " + id);
    this.navCtrl.push(UserdetailPage, { userid: id });
  }

}
