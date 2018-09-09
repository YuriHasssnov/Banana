import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { HomePage } from '../home/home'
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(

)

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  responseData: any;
  userData = { "name": "", "email": "", "username": "", "password": "" };
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public alertCtrl: AlertController) {
  }

  signUp() {
    this.authService.postData(this.userData, "register").then((result) => {
      this.responseData = result;
      if (this.responseData.userData) {
        localStorage.setItem('userData', JSON.stringify(this.responseData));
      }
      this.showAlert();
    });
  }

  gotoHome() {
    this.navCtrl.popTo(HomePage);
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'SignUp-Success!',
      subTitle: 'Congratulations for Sign Up!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.push(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }
}


