import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { SessionProvider } from '../../providers/session/session';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public username: string;
  public password: string;
  private errorMessage: string = '';
  private data: any;

  constructor(public navCtrl: NavController, public serviceSession: SessionProvider, public toastController: ToastController, private storage: Storage) {
    this.data = {
      data: {
        authorization_code: ''
      }
    };
  }

  login() {
    this.serviceSession.authorize(this.username, this.password)
      .subscribe(data => {
        this.data = data;
        console.log("Authorization_code");
        console.log(this.data.data.authorization_code);

        this.serviceSession.accessToken(this.data.data.authorization_code).subscribe(data => {
          this.data = data;
          console.log(data);
          this.storage.set('accessToken', this.data.data.access_token);

          this.navCtrl.setRoot(HomePage);

          this.navCtrl.popToRoot();

          //Consolidar el accesstoken en session
        }, error => {
          console.log('Error en accessToken');
          console.log(error);
          /*
                  if (error.error.errors.username) {
                    this.errorMessage += error.error.errors.username[0] + '\n';
                  }
                  if (error.error.errors.password) {
                    this.errorMessage += error.error.errors.password[0] + '\n';
                  }
                 
                  this.presentToast();*/
        });

      }, error => {

        if (error.error.errors.username) {
          this.errorMessage += error.error.errors.username[0] + '\n';
        }
        if (error.error.errors.password) {
          this.errorMessage += error.error.errors.password[0] + '\n';
        }

        this.presentToast();
      });
  }

  goRegister() {
    this.navCtrl.push(RegisterPage);
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: this.errorMessage,
      duration: 2000
    });
    toast.present();
  }
}
