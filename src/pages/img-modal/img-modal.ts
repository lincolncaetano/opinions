import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Slides } from 'ionic-angular';

/*
  Generated class for the ImgModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-img-modal',
  templateUrl: 'img-modal.html'
})
export class ImgModalPage {

  @ViewChild(Slides) slides: Slides;
  postagem : any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    this.slides.initialSlide = this.navParams.get('imgNum');
    this.postagem = this.navParams.get('postagem');

  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

}
