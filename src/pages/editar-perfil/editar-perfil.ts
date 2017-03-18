import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Camera } from 'ionic-native';

import {TranslateService} from 'ng2-translate';
import { UserData } from '../../providers/user-data';
import { UsuarioService } from '../../providers/usuario-service';

@Component({
  selector: 'page-editar-perfil',
  templateUrl: 'editar-perfil.html'
})
export class EditarPerfilPage {

  retornoUsuario: any;
  retornoCadastro: any;
  usuario: any = {};
  private base64Image1;
  private base64Image2;
  private imagem1;
  private imagem2;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    public userData: UserData,
    public usuarioService: UsuarioService,
    public translate: TranslateService
  ) {
    this.userData.getId().then((id) => {
      this.usuarioService.pesquisaUsuarioPorId(id).subscribe(
        data => this.retornoUsuario = data,
        err => this.logError(err),
        () => this.buscaUsuarioComplete()
      );
    });
  }

  logError(err){
    console.log(err);
  }

  buscaUsuarioComplete(){
    if(this.retornoUsuario != false){
      this.usuario = this.retornoUsuario;
    }
  }

  onSalvarPerfil(form: NgForm){

    this.usuario.fotoBase64 = this.imagem1;
    this.usuario.backgroundBase64 = this.imagem2;

    this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
      data =>this.retornoCadastro = data,
      err => this.logError(err),
      () => this.salvarComplete()
    );
  }

  salvarComplete(){
    if(this.retornoCadastro != false){
      this.usuario = this.retornoUsuario;
      this.dismiss();
    }
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

  retornaMsg(msg){
    let retorno;
    this.translate.get(msg).subscribe(
      value => {
       retorno =  value;
      }
    )

    return retorno;
  }

  presentActionSheet(num) {

    let tirarFoto = this.retornaMsg('TIRA FOTO');
    let tirarBiblioteca = this.retornaMsg('USAR BIBLIOTECA');
    let cancelar = this.retornaMsg('CANCELAR');


    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: tirarFoto,
          handler: () => {
            this.getFoto(num,Camera.PictureSourceType.CAMERA);
          }
        },{
          text: tirarBiblioteca,
          handler: () => {
            this.getFoto(num,Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },{
          text: cancelar,
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
          encodingType: Camera.EncodingType.PNG,
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
          encodingType: Camera.EncodingType.PNG,
          mediaType: Camera.MediaType.PICTURE,
          correctOrientation: true,
          saveToPhotoAlbum : false
      }
    }

    console.log(opitions);


    Camera.getPicture(opitions).then((imageData) => {
      if(num == 1){
        this.base64Image1 = 'data:image/png;base64,' + imageData;
        this.imagem1 = imageData;
      }else if(num == 2){
        this.base64Image2 = 'data:image/png;base64,' + imageData;
        this.imagem2 = imageData;
      }

    }, (err) => {
     // Handle error
    });
  }


}
