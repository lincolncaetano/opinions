import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';


@Component({
  selector: 'page-compartilhar',
  templateUrl: 'compartilhar.html'
})
export class CompartilharPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompartilharPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  compartilhaPubliccao(){
    this.viewCtrl.dismiss();
    console.log("Salvaaaaaaaaaaa");
  }

}
