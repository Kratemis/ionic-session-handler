import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public username: string;
  public password: string;
  public email: string;
  private errorMessage: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public serviceSession: SessionProvider, public toastController: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register() {
    this.serviceSession.register(this.username, this.password, this.email)
      .subscribe(data => {
        this.navCtrl.pop();
        console.log(data);
      }, error => {

        if (error.error.errors.username) {
          this.errorMessage += error.error.errors.username[0] + '\n';
        }
        if (error.error.errors.password) {
          this.errorMessage += error.error.errors.password[0] + '\n';
        }
        if (error.error.errors.email) {
          this.errorMessage += error.error.errors.email[0] + '\n';
        }

        this.presentToast();
      });
  }

  goBack() {
    this.navCtrl.pop();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.errorMessage,
      duration: 2000
    });
    toast.present();
  }





}
