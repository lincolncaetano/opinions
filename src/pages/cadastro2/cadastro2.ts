import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Camera } from 'ionic-native';

import { UsuarioService } from '../../providers/usuario-service';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-cadastro2',
  templateUrl: 'cadastro2.html'
})
export class Cadastro2Page {

  tabsPage = TabsPage;
  private base64Image1;
  private base64Image2;
  private usuario;
  private retornoCadastro;
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    public usuarioService: UsuarioService) {

      this.usuario = navParams.get('usuario');
      console.log(this.usuario);
    }

  ionViewDidLoad() {

  }

  onCadastro(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      //if(this.base64Image1 != null && this.base64Image2 != null){
     if(true){
        this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
          data =>this.retornoCadastro = data,
          err => this.logError(err),
          () => this.loginComplete()
        );
      }
    }
  }

  logError(err){
    console.log(err);
  }

  loginComplete(){
    if(this.retornoCadastro != false){
      this.navCtrl.push(TabsPage);
    }
  }

  presentActionSheet(num) {


    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
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

  getFoto(num, origem){

    let opitions;
    if(num == 1){
      opitions = {
          destinationType: Camera.DestinationType.DATA_URL,
          quality: 50,
          sourceType: origem,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE,
          allowEdit: true,
          correctOrientation: true,
          saveToPhotoAlbum : false,
          targetWidth: 300,
          targetHeight: 300
      }
    }else{
      opitions = {
          destinationType: Camera.DestinationType.DATA_URL,
          quality: 50,
          sourceType: origem,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE,
          correctOrientation: true,
          saveToPhotoAlbum : false
      }
    }

    console.log(opitions);


    Camera.getPicture(opitions).then((imageData) => {
      if(num == 1){
        this.base64Image1 = 'data:image/jpeg;base64,' + imageData;
      }else if(num == 2){
        this.base64Image2 = 'data:image/jpeg;base64,' + imageData;
      }

    }, (err) => {
     // Handle error
    });
  }

}
