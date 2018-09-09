import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert, LoadingController, Loading } from 'ionic-angular';
import { SignupPage } from '../signup/signup'
import { UserlistPage } from '../userlist/userlist';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loading: Loading;
  public alert: Alert;
  // private _HOST: string = "http://localhost:3003/";
  // responseData: any;
  userData = { "email": "", "password": "" };
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public authService: AuthServiceProvider,
    private _HTTP: HttpClient) {

  }

  ionViewDidLoad() {
    console.log('ion-View-Did-Load : LoginPage');
  }

  login() {
    this.presentLoading();
    this.authService.postData(this.userData, "login").then((result) => {
      console.log("result : " + result);
      if (result) {
        this.dismissLoading();
        this.navCtrl.push(UserlistPage);
      }
      else {
        this.dismissLoading();
        this.showAlert();
      }
    })
  }

  gotoHome() {
    this.navCtrl.popTo(HomePage);
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

  showAlert() {
    const alert = this.alertCtrl.create({
      subTitle: '- - Sorry - -',
      buttons: ['OK']
    });
    alert.present();
  }

}


