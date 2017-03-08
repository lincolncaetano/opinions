import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, ActionSheetController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Camera } from 'ionic-native';

import { UserData } from '../../providers/user-data';
import { PostagemService } from '../../providers/postagem-service';
import { CompartilharPage } from '../compartilhar/compartilhar';


@Component({
  selector: 'page-postagem',
  templateUrl: 'postagem.html'
})
export class PostagemPage {

  private base64Image1;
  private base64Image2;
  private image1;
  private image2;
  private privado;
  private postagem: any = {};
  retornoPostagem: any;
  private usuarioLogado;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public userData: UserData,
    public postagemService: PostagemService) {}

  ionViewWillEnter() {

    this.presentActionSheet(1);
    this.userData.getUsuario().then((usuario) => {
      this.usuarioLogado = usuario;
    });

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  verificaPubliccao(){
    if(this.privado){
      this.viewCtrl.dismiss();
      let compartilharModal = this.modalCtrl.create(CompartilharPage);
      compartilharModal.present();
    }else{
      console.log("Salvaaaaaaaaaaa");
    }
  }

  presentActionSheet(num) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Tirar foto',
          handler: () => {
            this.getFoto(num,Camera.PictureSourceType.CAMERA);
          }
        },{
          text: 'Usar da biblioteca',
          handler: () => {
            this.getFoto(num,Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    actionSheet.present();
  }

  getFoto(num,origem){

    let opitions = {
        destinationType: Camera.DestinationType.DATA_URL,
        quality: 50,
        sourceType: origem,
        encodingType: Camera.EncodingType.PNG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true,
        saveToPhotoAlbum : false,
        targetWidth: 300,
        targetHeight: 300
    }

    Camera.getPicture(opitions).then((imageData) => {
      if(num == 1){
        this.base64Image1 = 'data:image/jpeg;base64,' + imageData;
        this.image1 = imageData;
        this.presentActionSheet(2);
      }else if(num == 2){
        this.base64Image2 = 'data:image/jpeg;base64,' + imageData;
        this.image2 = imageData;
      }

    }, (err) => {
     // Handle error
    });
  }

  onNovaPostagem(form: NgForm){

    this.postagem.opcao1 = this.image1;
    this.postagem.opcao2 = this.image2;
    this.postagem.usuario = this.usuarioLogado;

    this.postagemService.postagemNova(this.postagem).subscribe(
      data =>this.retornoPostagem = data,
      err => this.logError(err),
      () => this.postagemComplete()
    );
  }

  logError(err){
    console.log(err);
  }

  postagemComplete(){
    if(this.retornoPostagem != false){

    }
  }



}
