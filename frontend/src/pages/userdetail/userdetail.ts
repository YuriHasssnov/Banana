import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert, LoadingController, Loading } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserlistPage } from '../userlist/userlist';



/**
 * Generated class for the UserdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userdetail',
  templateUrl: 'userdetail.html',
})
export class UserdetailPage {

  public loading: Loading;
  public alert: Alert;
  private _HOST: string = "http://localhost:3003/";
  user = { "_id": "", "name": "", "email": "", "username": "", "password": "" };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private _HTTP: HttpClient) {
  }

  ionViewDidLoad() {
    this.retrieveByID();
  }

  ionViewWillEnter() {
    this.retrieveByID();
  }

  retrieveByID() {
    this._HTTP.get(this._HOST + "user/edit/" + this.navParams.get('userid'))
      .subscribe((data: any) => {
        this.user = data.data;
      },
        (error: any) => {
          console.dir(error);
        });
  }

  updateUser(_id) {
    this.presentLoading();
    this._HTTP.put(this._HOST + "user/update/" + _id, this.user)
      .subscribe(() => {
        this.dismissLoading();
        this.navCtrl.push(UserlistPage);
      })
  }

  deleteUser(_id) {
    this.presentLoading();
    this._HTTP.delete(this._HOST + "user/delete/" + _id)
      .subscribe(() => {
        this.dismissLoading();
        this.navCtrl.push(UserlistPage);
      })
  }

  updateConfirm(user) {
    this.alert = this.alertCtrl.create({
      title: 'Confirm Updation',
      message: `Are you sure that you want to update '${user.name}' ? `,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Update',
          handler: () => {
            this.updateUser(user._id)
          }
        }
      ]
    });
    this.alert.present();
  }

  deleteConfirm(user) {
    this.alert = this.alertCtrl.create({
      title: 'Confirm Deletion',
      message: `Are you sure that you want to delete '${user.name}' ? `,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteUser(user._id)
          }
        }
      ]
    });
    this.alert.present();
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss();
  }





}





